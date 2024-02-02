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
      navigation.navigate("Scanner");
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
                <Tab.Screen name="Request" component={RequestScreen} />
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
        <FAB
          visible={isFocused}
          icon={'plus'}
          style={{
            position: 'absolute',
            bottom: 100,
            right: 90,
          }}
          color="white"
          onPress={navigateToCreateReceipt}
        />
      </Portal>
        </React.Fragment>
    );
}
