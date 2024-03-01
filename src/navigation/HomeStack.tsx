import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/shared/HomeScreen";
import CustomNavBar2 from "./CustomNavBar";
import BottomNavigator from "./BottomNavigator";
import Scanner from "../screens/shared/Scanner";
import QRCodeScreen from "../screens/host/QRCodeScreen";
import GuestsScreen from "../screens/host/GuestsScreen";
import AddGuestBySMSScreen from "../screens/host/AddGuestBySMSScreen";
import AddGuestBySearchScreen from "../screens/host/AddGuestBySearchScreen";
import CreateReceipt from "../screens/host/CreateReceipt";
import JoinReceiptScreen from "../screens/guest/JoinReceiptScreen";
import SelectItemsScreen from "../screens/shared/SelectItemsScreen";
import CustomNavBar from "./CustomNavBar";
import SettingsScreen from "../screens/shared/SettingsScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import EditProfileScreen from "../screens/shared/EditProfileScreen";
import EditProfilePasswordScreen from "../screens/shared/EditProfilePasswordScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: (props) => <CustomNavBar {...props} />,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="EditProfilePassword" component={EditProfilePasswordScreen} />
      <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
      <Stack.Screen name="CreateReceipt" component={CreateReceipt} />
      <Stack.Screen name="Scanner" component={Scanner} />
      <Stack.Screen name="JoinReceipt" component={JoinReceiptScreen} />
      <Stack.Screen name="SelectItems" component={SelectItemsScreen} />
      <Stack.Screen name="Share Receipt" component={QRCodeScreen} />
      <Stack.Screen name="Guests" component={GuestsScreen} />
      <Stack.Screen name="Add Guest" component={AddGuestBySMSScreen} />
      <Stack.Screen name="Search Guest" component={AddGuestBySearchScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
}
