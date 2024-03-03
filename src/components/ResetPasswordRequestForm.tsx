import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { Card, Button, Input, Text } from "@ui-kitten/components";
import * as AppConstants from "../constants/constants";
import { useAuth } from "../hooks/useAuth";
import { useValidation } from "../hooks/useValidation";

type ResetPasswordEmailFormData = {
  emailAddress: string;
};

const ResetPasswordRequestForm: React.FC<{
  navigation: any;
}> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordEmailFormData>();
  const { sendUserResetPasswordEmail } = useAuth();
  const { validateEmail } = useValidation();
  const theme = useTheme();
  const emailAddress = watch("emailAddress");
  const [userNotFound, setUserNotFound] = useState(false);
  const [tooManyRequests, setTooManyRequests] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: ResetPasswordEmailFormData) => {
    handleResetPasswordEmail(data.emailAddress);
  };

  const handleResetPasswordEmail = async (email: string) => {
    let parsedResponse = null;
    setLoading(true);
    setUserNotFound(false);

    await sendUserResetPasswordEmail(email).then((fbResponse) => {
      parsedResponse = JSON.parse(fbResponse);

      if (parsedResponse.error.code) {
        if (parsedResponse.error.code == "auth/user-not-found") {
          setUserNotFound(true);
        } else if (parsedResponse.error.code == "auth/too-many-requests") {
          setTooManyRequests(true);
        }
        console.log(parsedResponse.error.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setEmailSent(true);
      console.log("Password reset email sent successfully");
    });
  };

  useEffect(() => {
    if (emailAddress === "") {
      setUserNotFound(false);
    }
  }, [userNotFound, emailAddress]);

  return (
    <Card style={styles.card}>
      {emailSent ? (
        <>
          <Text category="h3" style={styles.title}>
            Email Sent!
          </Text>
          <Text
            category="p1"
            style={styles.directions}
          >
            An email has been sent to the provided address. Please check your
            inbox and click the link to continue.
          </Text>
          {tooManyRequests ? (
            <>
              <Text style={{ color: theme.colors.error }}>
                {AppConstants.ERROR_TooManyRequests}
              </Text>
              <Button
                onPress={() => navigation.navigate("SignIn")}
                style={styles.button}
              >
                Back to Sign In
              </Button>
            </>
          ) : (
            <Button
              onPress={handleSubmit(onSubmit)}
              style={styles.resendButton}
            >
              Didn't get the email? Resend
            </Button>
          )}
        </>
      ) : (
        <>
          <Text category="h3" style={styles.title}>
            Reset Password
          </Text>
          <Text
            category="p1"
            style={styles.directions}
          >
            Enter the email address associated with your account. You will be
            sent an email with instructions on how to reset your password.
          </Text>
          <Controller
            control={control}
            rules={{
              required: true,
              validate: {
                invalidEmail: (value) => {
                  return validateEmail(value);
                },
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Email Address"
                textContentType="emailAddress"
                // accessoryRight={
                //   watch("emailAddress") &&
                //   (validateEmail(value) ? (
                //     <TextInput.Icon icon="check" color="green" />
                //   ) : (
                //     <TextInput.Icon icon="close" color={theme.colors.error} />
                //   ))
                // }
                style={styles.textInput}
              />
            )}
            name="emailAddress"
          />
          {errors.emailAddress && errors.emailAddress.type === "required" && (
            <Text style={{ color: theme.colors.error }}>
              {AppConstants.ERROR_EmailIsRequired}
            </Text>
          )}
          {errors.emailAddress &&
            errors.emailAddress.type === "invalidEmail" && (
              <Text style={{ color: theme.colors.error }}>
                {AppConstants.ERROR_InvalidEmail}
              </Text>
            )}
          {userNotFound && watch("emailAddress") !== "" && (
            <Text style={{ color: theme.colors.error }}>
              {AppConstants.ERROR_EmailIsNotRegistered}
            </Text>
          )}
          {tooManyRequests && (
            <Text style={{ color: theme.colors.error }}>
              {AppConstants.ERROR_TooManyRequests}
            </Text>
          )}
          <Button
            onPress={handleSubmit(onSubmit)}
            style={styles.button}
          >
            Reset Password
          </Button>
          <Button
            appearance="ghost"
            onPress={() => navigation.navigate("SignIn")}
            style={styles.button}
          >
            Back to Sign In
          </Button>
        </>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingTop: 30,
    justifyContent: "center",
    paddingHorizontal: 20,
    borderRadius: 35,
  },
  button: {
    marginVertical: 10,
  },
  resendButton: {
    marginTop: 10,
    marginBottom: 20
  },
  textInput: {
    marginVertical: 10,
  },
  title: {
    textAlign: "center",
    marginBottom: 35
  },
  directions: {
    textAlign: "center",
    marginBottom: 35
  }
});

export default ResetPasswordRequestForm;
