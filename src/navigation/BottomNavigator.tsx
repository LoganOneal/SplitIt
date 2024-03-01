import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Portal, FAB } from 'react-native-paper';
import RequestScreen from "../screens/RequestScreen";
import MyReceiptsScreen from '../screens/shared/MyReceiptsScreen';
import React from 'react';
import { useIsFocused } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function BottomNavigator({navigation}:any) {
    const isFocused = useIsFocused();

    const navigateToScanner = () => {
      navigation.navigate("Upload Receipt");
    };

    const navigateToCreateReceipt = () => {
      navigation.navigate("CreateReceipt");
    };  

    return (
        <React.Fragment>
            <Tab.Navigator
                initialRouteName="Home"
            >
                <Tab.Screen name="My Receipts" component={MyReceiptsScreen} />
                <Tab.Screen name="Requests" component={RequestScreen} />
            </Tab.Navigator>
            <Portal>
        <FAB
          visible={isFocused}
          icon={'camera'}
          style={{
            position: 'absolute',
            bottom: 100,
            right: 16,
          }}
          color="white"
          onPress={navigateToScanner}
        />
      </Portal>
        </React.Fragment>
    );
}
