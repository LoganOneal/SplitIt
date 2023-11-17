import React, { useState } from "react";
import {
  Button,
  Surface,
  TextInput,
  useTheme,
  Snackbar,
  Text,
  ActivityIndicator,
} from "react-native-paper";
import { StyleSheet, Dimensions, StatusBar } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as Animatable from "react-native-animatable";
import { useAppDispatch } from "../store/hook";
import * as AppConstants from "../constants/constants";
import { ImageOverlay } from "../components/image-overlay";
import { useAuth } from "../hooks/useAuth";
import { IAuthState } from "../interfaces/IAuthentication";
import { userLoggedIn } from "../store/authSlice";

type SignInFormData = {
  emailAddress: string;
  password: string;
};

export default function SignUpScreen({ navigation }) {
  const theme = useTheme();
  const [showSnack, setShowSnack] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const dispatch = useAppDispatch();
  const { signinUser, getProfile } = useAuth();
  const {
    control,
    handleSubmit,
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
          // Redirect to home, if login worked
          navigation.navigate("Home");
        }
      }
    });
  };

  return (
    <ImageOverlay
      style={styles.container}
      source={require("../../assets/images/splash-pool.jpg")}
    >
      <StatusBar barStyle="light-content" />
      <Animatable.View
        style={[styles.contentContainer]}
        animation="fadeInUpBig"
      >
        <Surface style={styles.surface} elevation={1}>
          <Text variant="headlineSmall" style={{ textAlign: "center" }}>
            {AppConstants.TITLE_Register}
          </Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label={AppConstants.LABEL_EmailAddress}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                mode="outlined"
                placeholder="Email Address"
                textContentType="emailAddress"
                style={styles.textInput}
              />
            )}
            name="emailAddress"
          />
          {errors.emailAddress && (
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
              <TextInput
                label={AppConstants.LABEL_Password}
                mode="outlined"
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

          <Button
            mode="contained"
            compact
            onPress={handleSubmit(onSubmit)}
            style={styles.button}
            loading={loading}
          >
            Submit
          </Button>
          <Button
            mode="text"
            compact
            onPress={() => navigation.navigate("SignIn")}
            style={styles.button}
            loading={loading}
          >
            {AppConstants.LABEL_AlreadyAUser}
          </Button>
          <ActivityIndicator
            animating={loading}
            color={theme.colors.onPrimaryContainer}
            size="large"
          />
        </Surface>
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
    </ImageOverlay>
  );
}

const { height } = Dimensions.get("screen");
const container_height = height * 0.45;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  contentContainer: {
    marginHorizontal: 10,
    marginVertical: 20,
    height: container_height,
  },
  surface: {
    paddingTop: 30,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    borderRadius: 35,
    height: container_height,
  },
  button: {
    marginVertical: 20,
  },
  textInput: {
    marginVertical: 10,
  },
});
