import React from "react";
import { Dimensions, StyleSheet, View, TextInput } from "react-native";
import {
    Button,
    Surface,
    useTheme,
    Snackbar,
    Text,
    ActivityIndicator,
    List,
    Divider,
    Card
} from "react-native-paper";
import * as AppConstants from "../constants/constants";
interface AuthCardProps {
    formName: string;
    formInputs: JSX.Element[];
}

export default function AuthCard({ formName,formInputs }: AuthCardProps) {
    return (
        <Card style={styles.FormCard}>
            <Card.Title title={formName}/>
            <Card.Content style={styles.FormContainer}>
                {formInputs}
            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({
    FormCard:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.85,
        alightText: 'center',
        overflow: 'hidden',
    },
    FormContainer: {
        width: 300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

    }, 
});
