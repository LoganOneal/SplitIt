import * as React from "react";
import { NavigationContainer, Theme } from "@react-navigation/native";
import HomeStack from "./HomeStack";
import PublicStack from "./PublicStack";
import { useAppSelector } from "../store/hook";
import { selectAuthState } from "../store/authSlice";
import DrawerNavigator from "./DrawerNavigator";
import BottomNavigator from "./BottomNavigator"
import * as Linking from 'expo-linking';

/* Deep Linking Configuration
  - Can specify which screens to navigate to based on the deep link URL
    - So, if "NewPassword" is included in the URL (can be changed in firebase email template), then navigate to the ResetPassword screen
*/
const AppNavigator = (theme: Theme) => {
  const authState = useAppSelector(selectAuthState);

  const linking = {
    prefixes: [Linking.createURL('/'), 'https://app.example.com'],
    config: {
      screens: {
        ResetPassword: "NewPassword"
      }
    }
  };
  
  {/* Conditional stack navigator rendering based on login state */}
  return (
    // TODO - Pass theme prop into NavigationContainer
    <NavigationContainer linking={linking}>
      {authState?.isLoggedIn ? <HomeStack /> : <PublicStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
