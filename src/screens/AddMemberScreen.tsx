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

export default function AddMemberScreen({ navigation }) {
  return (
    <View>
      <Text>Add Member Screen</Text>
      <Button
        onPress={() => navigation.goBack()}
        >
        Submit
      </Button>
    </View>
  )
}