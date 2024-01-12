import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/HomeScreen";
import RequestScreen from "../screens/RequestScreen";
import DrawerContent from "./DrawerContent";
import MyReceipts from '../screens/MyReceipts';

const Tab = createBottomTabNavigator();

export default function BottomNavigator(props) {
    return (
        <Tab.Navigator
            initialRouteName="Home"
        >
            <Tab.Screen name="My Receipts" component={MyReceipts} />
            <Tab.Screen name="Request" component={RequestScreen} />
        </Tab.Navigator>
    );
}
