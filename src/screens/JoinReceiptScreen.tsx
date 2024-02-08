import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import {
  Button,
  useTheme,
  Text,
  Surface
} from 'react-native-paper';

import * as AppConstants from '../constants/constants';
import { selectAuthState } from '../store/authSlice';
import { useAppSelector } from '../store/hook';

export default function JoinReceiptScreen({ navigation }) {
  const theme = useTheme();
  const authState = useAppSelector(selectAuthState)

  const onJoinReceipt = () => {
    if (authState?.isLoggedIn) {
      /* go to receipt page */
    } else {
      navigation.navigate("SignIn");
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.primaryContainer },
      ]}>
      <Surface style={styles.surface} elevation={1}>
        <Text variant="headlineSmall">Host:</Text>
        <Text variant="headlineSmall" style={styles.textData}>*insert host*</Text>
        <Text variant="headlineSmall">Vendor:</Text>
        <Text variant="headlineSmall" style={styles.textData}>*insert vendor*</Text>
        <Text variant="headlineSmall">Date:</Text>
        <Text variant="headlineSmall" style={styles.textData}>*insert date*</Text>
      </Surface>

    <Button
        mode="contained"
        buttonColor="black"
        textColor="white"
        contentStyle={styles.button}
        style={styles.buttonContainer}
        onPress={onJoinReceipt}>
        {AppConstants.LABEL_JoinReceipt}
      </Button>
    </View>
  );
}

const { width } = Dimensions.get("screen");

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
    padding: 20,
  },
  surface: {
    width: width * 0.85,
    marginTop: width * 0.075,
    padding: 15
  },
  textData: {
    paddingLeft: 15,
    marginBottom: 40
  }
});