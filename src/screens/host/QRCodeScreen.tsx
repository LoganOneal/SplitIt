import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Button, Card, Text } from '@ui-kitten/components';

import * as AppConstants from "../../constants/constants";

export default function QRCodeScreen({ route, navigation }) {
  const { receiptId } = route.params;

  return (
    <View
      style={styles.container}>
      <Text category='h4'>
        Share Receipt
      </Text>
      <Card style={styles.card}>
        <Text>*Insert QR Code*</Text>
      </Card>
      <View style={styles.bottomButtons}>
        <Button
          appearance="outline"
          style={styles.button}
          onPress={() => navigation.navigate("Guests", {receiptId: receiptId})}>
          ADD GUEST MAUNALLY +
        </Button>
        <Button
          style={styles.button}
          onPress={() => navigation.pop(2)}>
          DONE
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
    marginTop: 20
  },
  bottomButtons: {
    marginBottom: 50
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 40,
  },
  card: {
    width: qrcode_side_length,
    height: qrcode_side_length,
  }
});