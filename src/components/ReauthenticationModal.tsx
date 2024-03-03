import React, { useState } from "react";
import { View, Modal, TextInput } from "react-native";
import { Button, Text } from "react-native-paper";

import { Alert, StyleSheet } from "react-native";
import { useFirestore } from "../hooks/useFirestore";

const ReauthenticateModal = ({
  isVisible,
  closeModal,
  onSuccess,
}: {
  isVisible: boolean;
  closeModal: () => void;
  onSuccess: () => void;
}) => {
  const [password, setPassword] = useState("");
  const { reauthenticateUser } = useFirestore();

  const handleReauthentication = async () => {
    try {
      await reauthenticateUser(password);
      onSuccess();
    } catch (error) {
      Alert.alert("Error", "Incorrect password. Please try again.");
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={closeModal}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.text}>
            Enter your password to reauthenticate and continue:
          </Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            placeholder="Password"
            style={styles.inputText}
          />
          <Button
            mode="contained"
            onPress={handleReauthentication}
            style={{ marginBottom: 10 }}
          >
            Confirm
          </Button>
          <Button mode="outlined" onPress={closeModal}>
            Cancel
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default ReauthenticateModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  text: {
    marginBottom: 10,
  },
  inputText: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
