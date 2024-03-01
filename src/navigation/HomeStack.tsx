import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/shared/HomeScreen";
import CustomNavBar from "./CustomNavBar";
import BottomNavigator from "./BottomNavigator";
import Scanner from "../screens/shared/Scanner";
import QRCodeScreen from "../screens/host/QRCodeScreen";
import GuestsScreen from "../screens/host/GuestsScreen";
import AddGuestBySMSScreen from "../screens/host/AddGuestBySMSScreen";
import AddGuestBySearchScreen from "../screens/host/AddGuestBySearchScreen";
import CreateReceipt from "../screens/host/CreateReceipt";
import JoinReceiptScreen from "../screens/guest/JoinReceiptScreen";
import SelectItemsScreen from "../screens/shared/SelectItemsScreen";


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
      <Stack.Screen name="Receipts and Requests" component={BottomNavigator} />
      <Stack.Screen name="Upload Receipt" component={Scanner} />
      <Stack.Screen name="Create Receipt" component={CreateReceipt} />
      <Stack.Screen name="Join Receipt" component={JoinReceiptScreen} />
      <Stack.Screen name="Select Items" component={SelectItemsScreen} />
      <Stack.Screen name="Share Receipt" component={QRCodeScreen} />
      <Stack.Screen name="Guests" component={GuestsScreen} />
      <Stack.Screen name="Text Guest" component={AddGuestBySMSScreen} />
      <Stack.Screen name="Search Guest" component={AddGuestBySearchScreen} />
    </Stack.Navigator>
  );
}
