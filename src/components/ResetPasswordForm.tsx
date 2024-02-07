import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { Button, Surface, Text, TextInput, useTheme } from "react-native-paper";
import * as AppConstants from "../constants/constants";
import { useAuth } from "../hooks/useAuth";
import { useValidation } from "../hooks/useValidation";
import PasswordRequirements from "./PasswordRequirements";

type NewPasswordData = {
  password: string;
  confirmPassword: string;
};

const ResetPasswordForm: React.FC<{ navigation: any; verifyCode: string }> = ({
  navigation,
  verifyCode,
}) => {
  const theme = useTheme();
  const { confirmUserResetPassword } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<NewPasswordData>();

  const { validatePassword } = useValidation();
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const handlePasswordChange = (text: string) => {
    const isValid = validatePassword(text);
    setPassword(text);
    setIsPasswordValid(isValid);
  };

  const onSubmit = (data: NewPasswordData) => {
    let parsedResponse = null;
    confirmUserResetPassword(verifyCode, data.password).then((fbResponse) => {
      parsedResponse = JSON.parse(fbResponse);
      if (parsedResponse.error.code) {
        console.log(parsedResponse.error.message);
        return;
      }
      console.log("Password reset confirmed");
      setPasswordUpdated(true);
    });
  };

  return (
    <Animatable.View animation="fadeInUpBig">
      <Surface style={styles.surface} elevation={1}>
        {passwordUpdated ? (
          <>
            <Text variant="headlineSmall" style={{ textAlign: "center" }}>
              Password Updated!
            </Text>
            <Text
              variant="bodySmall"
              style={{ textAlign: "center", marginVertical: 10 }}
            >
              Your password has been successfully updated.
            </Text>
            <Button
              mode="text"
              compact
              onPress={() => navigation.navigate("SignIn")}
              style={styles.button}
            >
              Back to Sign In
            </Button>
          </>
        ) : (
          <>
            <Text variant="headlineSmall" style={{ textAlign: "center" }}>
              Enter a New Password
            </Text>
            <Text
              variant="bodySmall"
              style={{ textAlign: "center", marginVertical: 10 }}
            >
              Please enter in a new password. Once reset, you will be redirected
              to login.
            </Text>
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
                    label={AppConstants.LABEL_Password}
                    mode="outlined"
                    placeholder="Password"
                    onBlur={onBlur}
                    onChangeText={(text) => {
                      onChange(text);
                      handlePasswordChange(text);
                    }}
                    value={value}
                    secureTextEntry
                    textContentType="password"
                    right={
                      watch("password") &&
                      watch("password").length > 0 &&
                      (isPasswordValid ? (
                        <TextInput.Icon icon="check" color="green" />
                      ) : (
                        <TextInput.Icon
                          icon="close"
                          color={theme.colors.error}
                        />
                      ))
                    }
                    style={styles.textInput}
                  />
                  <PasswordRequirements
                    password={password}
                    show={isPasswordValid}
                  />
                </>
              )}
              name="password"
            />
            {errors.password && errors.password.type === "required" && (
              <Text style={{ color: theme.colors.error }}>
                {AppConstants.ERROR_PasswordIsRequired}
              </Text>
            )}
            {errors.password && errors.password.type === "validate" && (
              <Text style={{ color: theme.colors.error }}>
                {AppConstants.ERROR_InvalidPassword}
              </Text>
            )}

            <Controller
              control={control}
              rules={{
                maxLength: 16,
                required: true,
                validate: (val) => {
                  if (watch("password") != val) {
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
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                  textContentType="password"
                  right={
                    watch("password") &&
                    watch("password").length > 0 &&
                    (watch("password") === value ? (
                      <TextInput.Icon icon="check" color="green" />
                    ) : (
                      <TextInput.Icon icon="close" color={theme.colors.error} />
                    ))
                  }
                  style={styles.textInput}
                />
              )}
              name="confirmPassword"
            />
            {errors.confirmPassword &&
              errors.confirmPassword.type === "required" && (
                <Text style={{ color: theme.colors.error }}>
                  {AppConstants.ERROR_PasswordIsRequired}
                </Text>
              )}
            {errors.confirmPassword &&
              errors.confirmPassword.type === "validate" && (
                <Text style={{ color: theme.colors.error }}>
                  {AppConstants.ERROR_ConfirmPassword}
                </Text>
              )}
            <Button
              mode="contained"
              compact
              onPress={handleSubmit(onSubmit)}
              style={styles.button}
            >
              Submit
            </Button>
          </>
        )}
      </Surface>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  surface: {
    paddingTop: 30,
    justifyContent: "center",
    paddingHorizontal: 20,
    borderRadius: 35,
  },
  button: {
    marginVertical: 10,
  },
  textInput: {
    marginVertical: 10,
  },
});

export default ResetPasswordForm;
