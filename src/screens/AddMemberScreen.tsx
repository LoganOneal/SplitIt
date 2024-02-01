import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import {
  Button,
  Surface,
  TextInput,
  useTheme,
  Text
} from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';

import * as AppConstants from '../constants/constants';
import { useFirestore } from '../hooks/useFirestore';

type AddMemberFormData = {
  name: string;
  phoneNumber: string;
};

export default function AddMemberScreen({ route, navigation }) {
  const theme = useTheme();
  const { receiptId } = route.params;
  const { addUserToReceipt } = useFirestore();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<AddMemberFormData>();

  const onSubmit = (data: AddMemberFormData) => {
    handleAddMember(data.name, data.phoneNumber);
  };

  const handleAddMember = async (name: string, phoneNumber: string) => {
    // console.log(name)
    // console.log(phoneNumber)
    setLoading(true);
    // const receipt = await getReceipt(receipt);
    // console.log(receipt);
    await addUserToReceipt(receiptId, name, phoneNumber).then(() => {
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
    <View
    style={[
      styles.container,
      { backgroundColor: theme.colors.primaryContainer },
    ]}>
      <Surface style={styles.surface} elevation={1}>
        {/* <Text variant="titleMedium" style={styles.inputLabel}>
          {AppConstants.LABEL_Name}
        </Text> */}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label={AppConstants.LABEL_Name}
            placeholder={AppConstants.PLACEHOLDER_Name}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            mode="outlined"
            keyboardType="default" />
          )}
          name="name"
        />
        {errors.name && (
          <Text style={{ color: theme.colors.error }}>
            {AppConstants.ERROR_NameIsRequired}
          </Text>
        )}

        {/* <Text variant="titleMedium" style={styles.inputLabel}>
          {AppConstants.LABEL_Phone}
        </Text> */}
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 12,
            maxLength: 12,
            pattern: /[0-9]{3}-[0-9]{3}-[0-9]{4}/
          }}
          render={({ field: { onChange, onBlur, value }}) => (
          <TextInput
            label={AppConstants.LABEL_Phone}
            placeholder={AppConstants.PLACEHOLDER_Phone}
            onBlur={onBlur}
            onChangeText={(val) => { onChange(onPhoneNumberChange(val)) }}
            value={value}
            mode="outlined"
            keyboardType="numeric" 
            style={styles.phoneNumberInput} />
          )}
          name="phoneNumber"
        />
        {errors.phoneNumber && (
          <Text style={{ color: theme.colors.error }}>
            {AppConstants.ERROR_InvalidPhoneNumber}
          </Text>
        )}

        <Button
          mode="contained"
          buttonColor="black"
          textColor="white"
          loading={loading}
          contentStyle={styles.button}
          style={styles.buttonContainer}
          onPress={handleSubmit(onSubmit)}>
          {AppConstants.LABEL_Submit}
        </Button>
      </Surface>
    </View>
  )
}

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  button: {
    height: 50,
  },
  buttonContainer: {
    borderRadius: 0,
    marginTop: 30
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 1,
  },
  phoneNumberInput: {
    marginTop: 25
  },
  surface: {
    width: width * 0.85,
    marginTop: width * 0.075,
    padding: 15
  },
});