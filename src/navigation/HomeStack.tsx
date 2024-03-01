import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/shared/HomeScreen";
import CustomNavBar from "./CustomNavBar";
import Scanner from "../screens/shared/Scanner";
import QRCodeScreen from "../screens/host/QRCodeScreen";
import GuestsScreen from "../screens/host/GuestsScreen";
import AddGuestBySMSScreen from "../screens/host/AddGuestBySMSScreen";
import AddGuestBySearchScreen from "../screens/host/AddGuestBySearchScreen";
import CreateReceipt from "../screens/host/CreateReceipt";
import JoinReceiptScreen from "../screens/guest/JoinReceiptScreen";
import SelectItemsScreen from "../screens/shared/SelectItemsScreen";
import MyReceiptsScreen from "../screens/shared/MyReceiptsScreen";
import RequestScreen from "../screens/RequestScreen";
import { Portal, FAB } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { useState } from 'react';
import {useNavigation} from '@react-navigation/native';
const Stack = createNativeStackNavigator();

export default function HomeStack() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [open, setOpen] = useState(false);
  const onStateChange = ({ open }: { open: boolean }) => setOpen(open);
  const navigateToScanner = () => {
    navigation.navigate("Scanner");
  };

  const navigateToCreateReceipt = () => {
    navigation.navigate("CreateReceipt");
  };
  const navigateToJoinReceipt = () => {
    navigation.navigate("JoinReceipt");
  }

  return (
    <React.Fragment>

      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: (props) => <CustomNavBar {...props} />,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="My Receipts" component={MyReceiptsScreen} />
        <Stack.Screen name="Request" component={RequestScreen} />
        <Stack.Screen name="Scanner" component={Scanner} />
        <Stack.Screen name="CreateReceipt" component={CreateReceipt} />
        <Stack.Screen name="JoinReceipt" component={JoinReceiptScreen} />
        <Stack.Screen name="SelectItems" component={SelectItemsScreen} />
        <Stack.Screen name="Share Receipt" component={QRCodeScreen} />
        <Stack.Screen name="Guests" component={GuestsScreen} />
        <Stack.Screen name="Add Guest" component={AddGuestBySMSScreen} />
        <Stack.Screen name="Search Guest" component={AddGuestBySearchScreen} />
      </Stack.Navigator>
      <Portal>
        <FAB.Group
          open={open}
          icon={open ? 'close' : 'plus'}
          actions={[
            {
              icon: 'camera',
              label: 'Scan',
              onPress: navigateToScanner,
            },
            {
              icon: 'receipt',
              label: 'Join Receipt',
              onPress: navigateToJoinReceipt,
            },
            {
              icon: 'file-plus',
              label: 'Add Receipt',
              onPress: navigateToCreateReceipt,
            },
          ]}
          onStateChange={onStateChange}
          visible={isFocused}
          style={{
            position: 'absolute',
            right: 16,
          }}
        />

      </Portal>
    </React.Fragment>
  );
}
