import * as Linking from "expo-linking";
import React, { useEffect, useState } from "react";
import { Dimensions, StatusBar, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import ResetPasswordRequestForm from "../components/ResetPasswordRequestForm";
import ResetPasswordForm from "../components/ResetPasswordForm";
import { ImageOverlay } from "../components/image-overlay";
import { useAuth } from "../hooks/useAuth";

export default function ResetPasswordScreen({ navigation }) {
  const { verifyResetPasswordCode } = useAuth();
  const [step, setStep] = useState(1);
  const [oobCode, setOobCode] = useState("");

  const parseDeepLinkURL = (url: string) => {
    const { path, queryParams } = Linking.parse(url);
    return { path, queryParams };
  };

  /* 
    This useEffect is used for the deep linking functionality.
    - When a user selects the email reset link, the app will open and the deep link will be handled here.
    - The deep link will contain the oobCode as a path param which is used to verify the reset password code.
    - NOTE: The current email template is set up assuming you are running Expo Go. 
        So, the link within the email template will be for the expo server. This will need to be changed in Firebase when deployed.
    - NOTE: If the path within the deep link is "NewPassword", then we verify the reset password code. (This can be changed in the firebase email template)
  */
  useEffect(() => {
    const handleDeepLinkURL = async (url: string) => {
      const { queryParams, path } = parseDeepLinkURL(url);
      let parsedResponse = null;

      if (path === "NewPassword") {
        if (queryParams && queryParams.oobCode) {
          verifyResetPasswordCode(queryParams.oobCode as string).then(
            (fbResponse) => {
              parsedResponse = JSON.parse(fbResponse);
              if (parsedResponse.error.code) {
                console.log(parsedResponse.error.message);
                return;
              }
              setOobCode(queryParams.oobCode as string);
              setStep(2);
            }
          );
        }
      }
    };

    const checkInitialUrl = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        // console.log("CALLING WITH INITIAL: ", initialUrl);
        handleDeepLinkURL(initialUrl);
      }
    };

    const handleUrl = ({ url }: { url: string }) => {
      // console.log("CALLING WITH URL: ", url);
      handleDeepLinkURL(url);
    };

    const subscription = Linking.addEventListener("url", handleUrl);
    checkInitialUrl();

    return () => {
      subscription.remove();
    };
  }, []);

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
        {step === 1 && <ResetPasswordRequestForm navigation={navigation} />}
        {step === 2 && (
          <ResetPasswordForm navigation={navigation} verifyCode={oobCode} />
        )}
      </Animatable.View>
    </ImageOverlay>
  );
}

const { height } = Dimensions.get("screen");
const container_height = height * 0.75;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  contentContainer: {
    marginHorizontal: 10,
    marginVertical: 20,
    height: container_height,
  },
});
