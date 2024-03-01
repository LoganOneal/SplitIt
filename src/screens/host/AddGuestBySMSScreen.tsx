import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, ViewProps } from 'react-native';
import { Button, Card, Text, Input } from '@ui-kitten/components';
import { Controller, useForm } from 'react-hook-form';
import * as SMS from 'expo-sms';

import * as AppConstants from '../../constants/constants';
import { useFirestore } from '../../hooks/useFirestore';
import { useAppSelector } from '../../store/hook';
import { selectAuthState } from '../../store/authSlice';

type AddMemberFormData = {
  name: string;
  phoneNumber: string;
};

export default function AddGuestByTextScreen({ route, navigation }) {
  const { receiptId } = route.params;
  const { addNewUserToReceipt } = useFirestore();
  const [loading, setLoading] = useState(false);
  const authState = useAppSelector(selectAuthState);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<AddMemberFormData>();

  const onSubmit = (data: AddMemberFormData) => {
    handleAddMember(data.name, data.phoneNumber);
  };

  const handleAddMember = async (name: string, phoneNumber: string) => {
    setLoading(true);
    await addNewUserToReceipt(receiptId, name, phoneNumber).then(async () => {
      phoneNumber = phoneNumber.replace("-", "");
      await SMS.sendSMSAsync(
        [phoneNumber],
        `Join ${authState?.userName}'s receipt on SplitIt: {insert link}`
      );
      setLoading(false);
      navigation.goBack();
    });
  };

  const onPhoneNumberChange = (phoneNumber: string) => {
    phoneNumber = phoneNumber.replaceAll("-", "")
    if (phoneNumber.length < 4)
      return phoneNumber
    if (phoneNumber.length < 7)
      return `${phoneNumber.slice(0,3)}-${phoneNumber.slice(3)}`
    return `${phoneNumber.slice(0,3)}-${phoneNumber.slice(3,6)}-${phoneNumber.slice(6)}`
  }

  return (
    <View style={styles.container}>
      <Text category='h4' style={styles.header}>
        Add Guest Via Text
      </Text>
      <Card>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Name"
            placeholder="Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="default"
            size="large" />
          )}
          name="name"
        />
        {errors.name && (
          <Text style={styles.error}>
            Name is required
          </Text>
        )}

        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 12,
            maxLength: 12,
            pattern: /[0-9]{3}-[0-9]{3}-[0-9]{4}/
          }}
          render={({ field: { onChange, onBlur, value }}) => (
          <Input
            label="Phone Number"
            placeholder="###-###-####"
            onBlur={onBlur}
            onChangeText={(val) => { onChange(onPhoneNumberChange(val)) }}
            value={value}
            keyboardType="numeric" 
            size="large"
            style={styles.phoneNumberInput} />
          )}
          name="phoneNumber"
        />
        {errors.phoneNumber && (
          <Text style={styles.error}>
            Invalid Phone Number
          </Text>
        )}

        <Button
          style={styles.button}
          onPress={handleSubmit(onSubmit)}>
          SUBMIT
        </Button>
      </Card>
    </View>
  )
}

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  button: {
    marginTop: 42,
  },
  phoneNumberInput: {
    marginTop: 25
  },
  error:{
    color: "#d60202"
  },
  header: {
    marginBottom: 35,
    alignSelf: "center"
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 40
  },
  input: {
    margin: 2,
  },
});