import { validatePassword } from "firebase/auth";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import PasswordRequirements from "../../components/PasswordRequirements";
import { useFirestore } from "../../hooks/useFirestore";

const EditPaymentSettingsScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const { profile } = route.params;
  const [venmoName, setVenmoName] = useState("");
  const { updateVenmoNameFirestore } = useFirestore();

  const handleSave = () => {
    if (venmoName !== profile?.venmoName) {
      updateVenmoNameFirestore(venmoName);
      navigation.goBack();
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Payment Settings</Text>
        </View>
        <Text style={styles.rowLabel}>Venmo Username</Text>
        <View style={styles.rowWrapper}>
          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.rowValueContainer]}>
              <TextInput
                style={styles.rowValue}
                mode="outlined"
                value={venmoName}
                onChangeText={setVenmoName}
                placeholder={profile?.venmoName || "Enter Venmo Username"}
              />
            </View>
          </View>
        </View>

        <Button icon="content-save" mode="contained-tonal" onPress={handleSave}>
          Save
        </Button>
      </View>
    </ScrollView>
  );
};

export default EditPaymentSettingsScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  textInput: {
    marginVertical: 10,
  },
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 6,
  },
  row: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: 50,
  },
  rowWrapper: {
    borderTopWidth: 1,
    borderColor: "#e3e3e3",
    paddingBottom: 12,
    paddingTop: 12,
  },
  passwordRequirements: {
    paddingLeft: 24,
    paddingBottom: 12,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  rowValueContainer: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  rowValue: {
    fontSize: 17,
    fontWeight: "500",
    color: "#8B8B8B",
    flex: 1,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: "500",
    paddingLeft: 10,
    paddingBottom: 10,
    color: "#000",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});
