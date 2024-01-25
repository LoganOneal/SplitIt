import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  Button,
  Surface,
  useTheme,
  Text
} from "react-native-paper";

import * as AppConstants from "../constants/constants";

export default function QRCodeScreen({ route, navigation }) {
  const theme = useTheme();
  const { receipt } = route.params;

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
          textColor="black"
          contentStyle={styles.button}
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("Group Members", {receipt: receipt})}>
          {AppConstants.LABEL_AddMemberManually}
        </Button>
        <Button
          mode="contained"
          buttonColor="black"
          contentStyle={styles.button}
          style={styles.buttonContainer}
          onPress={() => {}}>
          {AppConstants.LABEL_CreateGroup}
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