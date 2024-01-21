import React from 'react';
import { StyleSheet, View } from "react-native";
import {
  Button,
  Surface,
  TextInput,
  useTheme,
  Snackbar,
  Text,
  ActivityIndicator,
} from "react-native-paper";

export default function QRCodeScreen({ navigation }) {
  return (
    <View>
      <Text>QR Code Screen</Text>
      <Button
        onPress={() => navigation.navigate("Group Members")}
        >
        Add Member Manually +
      </Button>
    </View>
  )
}