import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
    Button,
    Surface,
    TextInput,
    useTheme,
    Snackbar,
    Text,
    ActivityIndicator,
    List,
    Divider,
    Card
} from "react-native-paper";
import * as AppConstants from "../constants/constants";


export default function AuthCard() {
    return (
        <Card style={styles.FormCard}>
            <View>
                    <TextInput/>
                    <TextInput/>
                    <TextInput/>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    FormCard:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        height: 
    }
});
