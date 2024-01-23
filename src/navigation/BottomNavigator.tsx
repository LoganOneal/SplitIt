import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Portal, FAB } from 'react-native-paper';
import RequestScreen from "../screens/RequestScreen";
import MyReceipts from '../screens/MyReceipts';
import React from 'react';
import { useIsFocused } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function BottomNavigator({navigation}:any) {
    const isFocused = useIsFocused();
    let icon = 'camera';
    const navigateToScanner = () => {
      navigation.navigate("Scanner");
    };
    return (
        <React.Fragment>
            <Tab.Navigator
                initialRouteName="Home"
            >
                <Tab.Screen name="My Receipts" component={MyReceipts} />
                <Tab.Screen name="Request" component={RequestScreen} />
            </Tab.Navigator>
            <Portal>
        <FAB
          visible={isFocused}
          icon={icon}
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
