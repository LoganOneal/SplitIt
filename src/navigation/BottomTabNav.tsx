import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyReceipts } from '../screens';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}
function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

/* drawer menu navigation */
export default () => {

  return (
    <NavigationContainer>
      <Tab.Navigator >
        <Tab.Screen name="Home" component={MyReceipts} />
        <Tab.Screen name="My Receipts" component={MyReceipts} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
