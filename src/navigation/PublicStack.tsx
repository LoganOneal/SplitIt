import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/SignInScreen";
import SplashScreen from "../screens/SplashScreen";
import * as AppConstants from "../constants/constants";
import SignUpScreen from "../screens/SignUpScreen";
import ThemeToggle from "./ThemeToggle";
import HomeStack from "./HomeStack";
import { useAppSelector } from "../store/hook";
import { selectAuthState } from "../store/authSlice";

const Stack = createNativeStackNavigator();

export default function PublicStack() {
  const authState = useAppSelector(selectAuthState);

  /* Conditional stack navigator rendering based on login state */
  return (
    <Stack.Navigator
      initialRouteName={authState?.isLoggedIn ? "HomeStack" : "Splash"}
      screenOptions={{
        headerShown: false,
      }}
    >
      {
        authState?.isLoggedIn ? 
        <Stack.Screen name="HomeStack" component={HomeStack} /> : 
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Splash" component={SplashScreen} />
        </>
      }
    </Stack.Navigator>
  );
}
