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
import { useForm, Controller, Form } from "react-hook-form";
import * as Animatable from "react-native-animatable";
import { useAppDispatch } from "../store/hook";
import * as AppConstants from "../constants/constants";
import { ImageOverlay } from "../components/image-overlay";
import { useAuth } from "../hooks/useAuth";
import { IAuthState } from "../interfaces/IAuthentication";
import { userLoggedIn } from "../store/authSlice";
import FormCard from "../components/FormCard";

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
    console.log(numAttempts)
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
    <ImageOverlay
      style={styles.container}
      source={require("../../assets/images/splash-pool.jpg")}
    >
      <StatusBar barStyle="light-content" />
      <Animatable.View
        style={[styles.contentContainer]}
        animation="fadeInUpBig"
      >
      <FormCard/>
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
    paddingHorizontal: 10,
    paddingVertical: 60,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  contentContainer: {
    marginHorizontal: 10,
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
