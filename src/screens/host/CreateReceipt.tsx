import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { FormBuilder } from 'react-native-paper-form-builder';
import { useForm } from 'react-hook-form';
import { Button } from 'react-native-paper';
import { useFirestore } from '../../hooks/useFirestore';
import { IReceipt } from '../../constants/types';

function CreateReceipt({ navigation }) {
    const { createReceipt } = useFirestore();

    const { control, setFocus, handleSubmit } = useForm({
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
                        const receipt: IReceipt = {
                            vendor: data.vendor,
                            location: data.location,
                            items: [
                                {
                                    name: 'item1',
                                    price: 1,
                                },
                                {
                                    name: 'item2',
                                    price: 2,
                                },
                                {
                                    name: 'item3',
                                    price: 3,
                                },
                            ],
                            total: 10.00,
                            subtotal: 15.00,
                            received: 2.5,
                            tax: 3.0,
                            tip: 4.5,
                        };

                        try {
                            createReceipt(receipt).then(res => {
                                const receiptId = res;
                                navigation.navigate("Share Receipt", {receiptId: receiptId});
                            });
                        } catch (error) {
                            console.log(error)
                            navigation.navigate("My Receipts");
                        } 
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