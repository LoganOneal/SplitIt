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
} from "react-native-paper";

export default function AuthCard() {
    return (
        <View>
            <List.Item
                title="name"
                style={styles.memberItem}
                right={props =>
                    <Ionicons
                        name={'person-outline'}
                        size={20}
                    />
                }
            />
            <Divider />
        </View>
    )
}
