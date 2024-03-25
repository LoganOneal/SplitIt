import React, { useState } from "react";
import {
  useTheme,
  Snackbar,
  ActivityIndicator,
} from "react-native-paper";
import {
  Button,
  Card,
  Input,
  Text
} from "@ui-kitten/components"
import { StyleSheet, Dimensions, StatusBar, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as Animatable from "react-native-animatable";
import { useAppDispatch } from "../store/hook";
import * as AppConstants from "../constants/constants";
import { useAuth } from "../hooks/useAuth";
import { IAuthState } from "../interfaces/IAuthentication";
import { userLoggedIn } from "../store/authSlice";
type SignInFormData = {
  emailAddress: string;
  password: string;
};

export default function SignInScreen({ navigation }) {
  const theme = useTheme();
  const [showSnack, setShowSnack] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validEmail, setValidEmail] = useState("");
  const [snackMessage, setSnackMessage] = useState("");
  const dispatch = useAppDispatch();
  const { signinUser, getProfile } = useAuth();
  const [numAttempts, incNumAttempts] = useState(0);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignInFormData>();

  const onSubmit = (data: SignInFormData) => {
    handleSignIn(data.emailAddress, data.password);
  };

  const onDismissSnackBar = () => setShowSnack(false);

  const handleSignIn = async (email: string, password: string) => {
    let parsedResponse = null;
    let firebaseToken = null;
    setLoading(true);
    incNumAttempts(numAttempts + 1);
    await signinUser(email, password).then((fbResponse) => {
      parsedResponse = JSON.parse(fbResponse);
      // error response
      if (parsedResponse.error.code) {
        setSnackMessage(parsedResponse.error.message);
        setShowSnack(true);
        setLoading(false);
        return;
      }
      // response
      if (parsedResponse.result) {
        firebaseToken = parsedResponse.result.user.stsTokenManager.accessToken;
        const firebaseUserName = parsedResponse.result.user.displayName;
        if (firebaseToken != null) {
          // Get firebase profile
          const profile = getProfile();
          const user: IAuthState = {
            firebaseUID: profile?.firebaseUID,
            userName: profile?.displayName ?? firebaseUserName,
            userToken: firebaseToken,
            userEmail: profile?.email ?? email,
            sessionTimedOut: false,
            isLoading: false,
            isLoggedIn: true,
          };
          // Redux action
          dispatch(userLoggedIn(user));
          setLoading(false);
          // React navigation will handle Redirect to home, if login worked
        }
      }
    });
  };

  const validateEmail = async (email: string) => {
    if (email.includes("@") && email.includes(".")) {
      return "";
    }
    return AppConstants.ERROR_InvalidEmailEntry;
  }

  return (
    <>
    <View style={[styles.container]}> 
      <StatusBar barStyle="light-content" />
      <Animatable.View
        style={[styles.contentContainer]}
        animation="fadeInUpBig"
      >
        <Card style={styles.card}>
          <Text category="h3" style={styles.title}>
            {AppConstants.TITLE_Login}
          </Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Input
                  onBlur={onBlur}
                  onChangeText={async Text => {
                    onChange(Text);
                    setSnackMessage(Text);
                    setValidEmail(await validateEmail(Text));
                  }}
                  value={value}
                  placeholder="Email Address"
                  textContentType="emailAddress"
                  style={styles.textInput}
                />
                <Text style={{ color: theme.colors.error }}>{validEmail}</Text>
              </>
            )}
            name="emailAddress"
          />
          {errors.emailAddress && (errors.emailAddress || !validateEmail(watch('emailAddress'))) && (
            <Text style={{ color: theme.colors.error }}>
              {AppConstants.ERROR_EmailIsRequired}
            </Text>
          )}
          <Controller
            control={control}
            rules={{
              maxLength: 100,
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
                textContentType="password"
                style={styles.textInput}
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text style={{ color: theme.colors.error }}>
              {AppConstants.ERROR_PasswordIsRequired}
            </Text>
          )}
          <>
            <Button
              appearance="ghost"
              size="small"
              onPress={() => navigation.navigate("ResetPassword")}
              style={styles.resetPassword}
            >
              Forgot Password?
            </Button>
            <Button
              onPress={handleSubmit(onSubmit)}
              disabled={numAttempts > 2}
              style={styles.button}
            >
              Login
            </Button>
            <Text style={{ color: theme.colors.error }}>
              {numAttempts > 2 ? AppConstants.ERROR_TooManyAttempts : ""}
            </Text>
          </>
          <Button
            appearance="outline"
            onPress={() => navigation.navigate("SignUp")}
            style={styles.button}
          >
            {AppConstants.LABEL_NotAUser}
          </Button>
          <ActivityIndicator
            animating={loading}
            size="small"
            style={styles.spinner}
            color={theme.colors.onPrimaryContainer}
          />
        </Card>
      </Animatable.View>
      <Snackbar
        visible={showSnack}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Close",
          onPress: () => {
            onDismissSnackBar();
          },
        }}
      >
        {snackMessage}
      </Snackbar>
      </View>
    </>
  );
}

const { height } = Dimensions.get("screen");
// const container_height = height * 0.45;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 100,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  contentContainer: {
    marginHorizontal: 10,
  },
  card: {
    paddingTop: 30,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    borderRadius: 35,
  },
  button: {
    marginVertical: 2
  },
  textInput: {
    marginVertical: 2,
  },
  title: {
    textAlign: "center",
    marginBottom: 35
  },
  resetPassword: {
    alignSelf: "flex-end",
    marginBottom: 20
  },
  spinner: {
    marginTop: 10
  }
});
