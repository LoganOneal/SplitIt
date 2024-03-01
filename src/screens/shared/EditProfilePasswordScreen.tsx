import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import * as AppConstants from "../../constants/constants";
import { TextInput, useTheme } from "react-native-paper";
import PasswordRequirements from "../../components/PasswordRequirements";
import { useValidation } from "../../hooks/useValidation";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { auth } from "../../services/firebase";

type EditProfilePasswordData = {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
};

// TODO: Clean up code, add error for incorrect password entered
const EditProfilePasswordScreen = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useForm<EditProfilePasswordData>();
  const theme = useTheme();

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const { validatePassword } = useValidation();

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleNewPasswordChange = (text: string) => {
    const isValid = validatePassword(text);
    setNewPassword(text);
    setIsPasswordValid(isValid);
    setPasswordsMatch(text === confirmNewPassword);
  };

  const handleConfirmNewPasswordChange = (text: string) => {
    setConfirmNewPassword(text);
    setPasswordsMatch(text === newPassword);
  }

const handleSave = async () => {
    console.log("Current Password: ", password);
    console.log("New password: ", newPassword);
    
    try {
        const user = auth.currentUser;
        if (user) {
            const credential = EmailAuthProvider.credential(user.email ?? "", password);
            const authenticated = await reauthenticateWithCredential(user, credential);
            if (authenticated) {
                console.log("User authenticated");
                await updatePassword(user, newPassword);
                console.log("Password updated");
            }
        }
    } catch (error) {
        console.error("Error reauthenticating user:", error);
    }
}

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Reset Password</Text>
        </View>
        <View style={styles.rowWrapper}>
          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.rowValueContainer]}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <TextInput
                      label={AppConstants.LABEL_Password}
                      mode="outlined"
                      placeholder="Enter Current Password"
                      onBlur={onBlur}
                      onChangeText={(text) => {
                        onChange(text);
                        handlePasswordChange(text);
                      }}
                      value={value}
                      secureTextEntry
                      textContentType="password"
                      style={styles.rowValue}
                    />
                  </>
                )}
                name="password"
              />
            </View>
          </View>
        </View>
        <View style={styles.row} />
        <View style={styles.rowWrapper}>
          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.rowValueContainer]}>
              <Controller
                control={control}
                rules={{
                  maxLength: 16,
                  required: true,
                  validate: (val) => {
                    const isValid = validatePassword(val);
                    setIsPasswordValid(isValid);
                    return isValid || AppConstants.ERROR_InvalidPassword;
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <TextInput
                      label={AppConstants.LABEL_NewPassword}
                      mode="outlined"
                      placeholder="Password"
                      onBlur={onBlur}
                      onChangeText={(text) => {
                        onChange(text);
                        handleNewPasswordChange(text);
                      }}
                      value={value}
                      secureTextEntry
                      textContentType="password"
                      right={
                        watch("newPassword") &&
                        watch("newPassword").length > 0 &&
                        (isPasswordValid ? (
                          <TextInput.Icon icon="check" color="green" />
                        ) : (
                          <TextInput.Icon
                            icon="close"
                            color={theme.colors.error}
                          />
                        ))
                      }
                      style={styles.rowValue}
                    />
                  </>
                )}
                name="newPassword"
              />
            </View>
          </View>
        </View>
        {!isPasswordValid && (
        <View style={styles.passwordRequirements}>
          <PasswordRequirements password={newPassword} show={isPasswordValid} />
        </View>
        )}
        <View style={styles.rowWrapper}>
          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.rowValueContainer]}>
              <Controller
                control={control}
                rules={{
                  maxLength: 16,
                  required: true,
                  validate: (val) => {
                    if (watch("newPassword") !== val) {
                      return AppConstants.ERROR_ConfirmPassword;
                    }
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label={AppConstants.LABEL_ConfirmPassword}
                    mode="outlined"
                    placeholder={AppConstants.PLACEHOLDER_ConfirmPassword}
                    onBlur={onBlur}
                    onChangeText={(text) => {
                      onChange(text);
                      handleConfirmNewPasswordChange(text);
                    }}
                    value={value}
                    secureTextEntry
                    textContentType="password"
                    right={
                      watch("confirmNewPassword") &&
                      watch("confirmNewPassword").length > 0 &&
                      (passwordsMatch ? (
                        <TextInput.Icon icon="check" color="green" />
                      ) : (
                        <TextInput.Icon
                          icon="close"
                          color={theme.colors.error}
                        />
                      ))
                    }
                    style={styles.rowValue}
                  />
                )}
                name="confirmNewPassword"
              />
            </View>
          </View>
        </View>
        <Button
          icon="content-save"
          mode="contained-tonal"
          onPress={handleSave}
          disabled={!passwordsMatch}
        >
          Save
        </Button>
      </View>
    </ScrollView>
  );
};

export default EditProfilePasswordScreen;

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
});
