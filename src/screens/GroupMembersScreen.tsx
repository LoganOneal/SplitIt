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

export default function GroupMembersScreen({ navigation }) {
  return (
    <View>
      <Text>Group Members Screen</Text>
      <Button
        onPress={() => navigation.navigate("Add Member")}
        >
        Add Member +
      </Button>
    </View>
  )
}