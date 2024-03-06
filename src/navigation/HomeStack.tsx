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
import SettingsScreen from "../screens/shared/SettingsScreen";
import EditProfileScreen from "../screens/shared/EditProfileScreen";
import EditProfilePasswordScreen from "../screens/shared/EditProfilePasswordScreen";
import EditPaymentSettingsScreen from "../screens/shared/EditPaymentSettingsScreen";
import MyReceiptsScreen from "../screens/shared/MyReceiptsScreen";
import RequestScreen from "../screens/RequestScreen";
import { Portal, FAB } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import CheckoutScreen from "../screens/guest/CheckoutScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [open, setOpen] = useState(false);
  const onStateChange = ({ open }: { open: boolean }) => setOpen(open);
  const navigateToScanner = () => {
    navigation.navigate("Upload Receipt");
  };

  const navigateToCreateReceipt = () => {
    navigation.navigate("Create Receipt");
  };
  const navigateToJoinReceipt = () => {
    navigation.navigate("Join Receipt");
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
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="EditProfilePassword" component={EditProfilePasswordScreen} />
        <Stack.Screen name="EditPaymentSettings" component={EditPaymentSettingsScreen} />
        <Stack.Screen name="Receipts" component={MyReceiptsScreen} />
        <Stack.Screen name="Request" component={RequestScreen} />
        <Stack.Screen name="Upload Receipt" component={Scanner} />
        <Stack.Screen name="GuestCheckout" component={CheckoutScreen} />
        <Stack.Screen name="Create Receipt" component={CreateReceipt} />
        <Stack.Screen name="Join Receipt" component={JoinReceiptScreen} />
        <Stack.Screen name="Select Items" component={SelectItemsScreen} />
        <Stack.Screen name="Share Receipt" component={QRCodeScreen} />
        <Stack.Screen name="Guests" component={GuestsScreen} />
        <Stack.Screen name="Text Guest" component={AddGuestBySMSScreen} />
        <Stack.Screen name="Search Guest" component={AddGuestBySearchScreen} />
      </Stack.Navigator>
      <Portal>
        <FAB.Group
          fabStyle={[{backgroundColor: '#c9d7ff'}]}
          color='#000'
          open={open}
          icon={open ? 'close' : 'plus'}
          actions={[
            {
              icon: 'camera',
              label: 'Scan',
              color: '#000',
              style: {'backgroundColor': '#c9d7ff'},
              onPress: navigateToScanner,
            },
            {
              icon: 'receipt',
              label: 'Join Receipt',
              color: '#000',
              style: {'backgroundColor': '#c9d7ff'},
              onPress: navigateToJoinReceipt,
            },
            {
              icon: 'file-plus',
              label: 'Add Receipt',
              color: '#000',
              style: {'backgroundColor': '#c9d7ff'},
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
