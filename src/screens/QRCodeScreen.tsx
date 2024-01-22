import React from 'react';
import { Dimensions, StyleSheet, View } from "react-native";
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
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.primaryContainer },
      ]}>
      <Surface style={styles.surface} elevation={1}>
        <Text>*Insert QR Code*</Text>
      </Surface>
      <View style={styles.bottomButtons}>
        <Button
          mode="contained"
          buttonColor="white"
          textColor='black'
          contentStyle={styles.button}
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("Add Member")}>
          Add Member Manually +
        </Button>
        <Button
          mode="contained"
          buttonColor="black"
          contentStyle={styles.button}
          style={styles.buttonContainer}
          onPress={() => {}}>
          Create Group
        </Button>
      </View>
    </View>
  )
}

const { width } = Dimensions.get("screen");
const qrcode_side_length = width * 0.85;

const styles = StyleSheet.create({
  button: {
    width: width * 0.85,
    height: 50,
  },
  bottomButtons: {
    marginBottom: 50
  },
  buttonContainer: {
    borderRadius: 0,
    marginTop: 20
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 1,
  },
  surface: {
    width: qrcode_side_length,
    height: qrcode_side_length,
    marginTop: width * 0.075
  },
});