import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/shared/HomeScreen";
import CustomNavBar from "./CustomNavBar";
import BottomNavigator from "./BottomNavigator";
import Scanner from "../screens/shared/Scanner";
import QRCodeScreen from "../screens/host/QRCodeScreen";
import GroupMembersScreen from "../screens/host/GroupMembersScreen";
import AddUserBySMSScreen from "../screens/host/AddUserBySMSScreen";
import AddUserBySearchScreen from "../screens/host/AddUserBySearchScreen";
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
      <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
      <Stack.Screen name="Scanner" component={Scanner} />
      <Stack.Screen name="CreateReceipt" component={CreateReceipt} />
      <Stack.Screen name="JoinReceipt" component={JoinReceiptScreen} />
      <Stack.Screen name="SelectItems" component={SelectItemsScreen} />
      <Stack.Screen name="Share Receipt" component={QRCodeScreen} />
      <Stack.Screen name="Group Members" component={GroupMembersScreen} />
      <Stack.Screen name="Add Member" component={AddUserBySMSScreen} />
      <Stack.Screen name="Search Member" component={AddUserBySearchScreen} />
    </Stack.Navigator>
  );
}
