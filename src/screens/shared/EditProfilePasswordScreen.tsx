import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, ScrollView, Alert, StyleSheet } from "react-native";
import * as AppConstants from "../../constants/constants";
import { Text, Button, useTheme, TextInput } from "react-native-paper";
import PasswordRequirements from "../../components/PasswordRequirements";
import { useValidation } from "../../hooks/useValidation";
import { updatePassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useFirestore } from "../../hooks/useFirestore";

type EditProfilePasswordData = {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
};

const EditProfilePasswordScreen = ({ navigation }: { navigation: any }) => {
  const {
    control,
    watch
  } = useForm<EditProfilePasswordData>();
  const theme = useTheme();
  const { reauthenticateUser } = useFirestore();
  const { validatePassword } = useValidation();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordError, setPasswordError] = useState("");

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
  };

  const handleSave = async () => {
    console.log("Current Password: ", password);
    console.log("New password: ", newPassword);
    const user = auth.currentUser;
    try {
      if (user) {
        await reauthenticateUser(password);
        await updatePassword(user, newPassword).then(() => {
          console.log("Password updated successfully");
        });
        setPasswordError("");
        Alert.alert("Success", "Password updated successfully.", [
          {
            text: "OK",
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      }
    } catch (error) {
      setPasswordError(error.message);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Reset Password</Text>
        </View>
        <View style={styles.rowWrapper}>
          <View style={styles.row}>
            <View style={styles.rowValueContainer}>
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
          {passwordError && (
            <Text style={styles.errorText}>{passwordError}</Text>
          )}
        </View>
        <View style={styles.row} />
        <View style={styles.rowWrapper}>
          <View style={styles.row}>
            <View style={styles.rowValueContainer}>
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
                      placeholder="New Password"
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
            <PasswordRequirements
              password={newPassword}
              show={isPasswordValid}
            />
          </View>
        )}
        <View style={styles.rowWrapper}>
          <View style={styles.row}>
            <View style={styles.rowValueContainer}>
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
          style={{ margin: 24 }}
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
  rowLabel: {
    fontSize: 17,
    fontWeight: "500",
    paddingBottom: 10,
    paddingLeft: 24,
    paddingRight: 24,
    color: "#000",
  },
  rowValue: {
    fontSize: 17,
    fontWeight: "500",
    borderColor: "#cccccc",
    flex: 1,
  },
  errorText: {
    fontSize: 12,
    fontWeight: "500",
    color: "red",
    marginLeft: 24,
    marginRight: 24,
  },

  rowValueContainer: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 24,
    paddingLeft: 24,
  },

  passwordRequirements: {
    marginLeft: 24,
    marginRight: 24,
    paddingBottom: 12,
  },
});
