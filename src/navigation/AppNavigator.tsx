import * as React from "react";
import { NavigationContainer, Theme } from "@react-navigation/native";
import HomeStack from "./HomeStack";
import PublicStack from "./PublicStack";
import { useAppSelector } from "../store/hook";
import { selectAuthState } from "../store/authSlice";
import DrawerNavigator from "./DrawerNavigator";

const AppNavigator = (theme: Theme) => {
  const authState = useAppSelector(selectAuthState);
  return (
    // TODO - Pass theme prop into NavigationContainer
    <NavigationContainer>
      {/* Conditional stack navigator rendering based on login state */}
      {authState?.isLoggedIn ? <DrawerNavigator /> : <PublicStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
