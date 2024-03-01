import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Portal, FAB } from 'react-native-paper';
import RequestScreen from "../screens/RequestScreen";
import MyReceiptsScreen from '../screens/shared/MyReceiptsScreen';
import React from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useState } from 'react';

const Tab = createBottomTabNavigator();

export default function BottomNavigator({navigation}:any) {
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
            <Tab.Navigator
                initialRouteName="Home"
            >
                <Tab.Screen name="My Receipts" component={MyReceiptsScreen} />
                <Tab.Screen name="Request" component={RequestScreen} />
            </Tab.Navigator>
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
            bottom: 40,
            right: 16,
          }}
        />

      </Portal>
        </React.Fragment>
    );
}
