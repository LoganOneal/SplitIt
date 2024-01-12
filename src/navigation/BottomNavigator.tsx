import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/HomeScreen";
import RequestScreen from "../screens/RequestScreen";
import DrawerContent from "./DrawerContent";

const Tab = createBottomTabNavigator();

export default function BottomNavigator(props) {
    return (
        <Tab.Navigator
            initialRouteName="Home"
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Request" component={RequestScreen} />
        </Tab.Navigator>
    );
}
