import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/shared/HomeScreen";
import CustomNavBar from "./CustomNavBar";
import BottomNavigator from "./BottomNavigator";
import Scanner from "../screens/shared/Scanner";
import QRCodeScreen from "../screens/host/QRCodeScreen";
import GroupMembersScreen from "../screens/host/GroupMembersScreen";
import AddMemberScreen from "../screens/host/AddMemberScreen";
import CreateReceipt from "../screens/host/CreateReceipt";
import JoinReceiptScreen from "../screens/guest/JoinReceiptScreen";

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

      <Stack.Screen name="Share Receipt" component={QRCodeScreen} />
      <Stack.Screen name="Group Members" component={GroupMembersScreen} />
      <Stack.Screen name="Add Member" component={AddMemberScreen} />
    </Stack.Navigator>
  );
}
