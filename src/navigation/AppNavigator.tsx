import * as React from "react";
import { NavigationContainer, Theme } from "@react-navigation/native";
import HomeStack from "./HomeStack";
import PublicStack from "./PublicStack";
import { useAppSelector } from "../store/hook";
import { selectAuthState } from "../store/authSlice";
import DrawerNavigator from "./DrawerNavigator";
import BottomNavigator from "./BottomNavigator"
import * as Linking from 'expo-linking';

const AppNavigator = (theme: Theme) => {
  const authState = useAppSelector(selectAuthState);

  const linking = {
    prefixes: [Linking.createURL('/'), 'https://app.example.com'],
  };
  
  return (
    // TODO - Pass theme prop into NavigationContainer
    <NavigationContainer >
      {/* Conditional stack navigator rendering based on login state */}
      {authState?.isLoggedIn ? <HomeStack /> : <PublicStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
