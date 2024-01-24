import React from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {FormBuilder} from 'react-native-paper-form-builder';
import {useForm} from 'react-hook-form';
import {Button} from 'react-native-paper';

function CreateReceipt() {
  const {control, setFocus, handleSubmit} = useForm({
    defaultValues: {
      vendor: '',
      location: '',
    },
    mode: 'onChange',
  });

  return (
    <View style={styles.containerStyle}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <Text style={styles.headingStyle}>Create Receipt</Text>
        <Text style={styles.subheadingStyle}>Add receipt to firebase with current user as host + mock items</Text>

        <FormBuilder
          control={control}
          setFocus={setFocus}
          formConfigArray={[
            {
              type: 'text',
              name: 'vendor',

              rules: {
                required: {
                  value: true,
                  message: 'Vendor is required',
                },
              },
              textInputProps: {
                label: 'Vendor',
              },
            },
            {
              type: 'text',
              name: 'location',
              rules: {
                required: {
                  value: true,
                  message: 'Location is required',
                },
              },
              textInputProps: {
                label: 'Location',
              },
            },
          ]}
        />
        <Button
          mode={'contained'}
          onPress={handleSubmit((data: any) => {
            console.log('form data', data);
          })}>
          Submit
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  scrollViewStyle: {
    flex: 1,
    padding: 15,
    justifyContent: 'flex-start',
  },
  headingStyle: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 5,
  },
  subheadingStyle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
  },
});

export default CreateReceipt;