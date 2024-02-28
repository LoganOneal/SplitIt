import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/shared/HomeScreen";
import RequestScreen from "../screens/RequestScreen";
import DrawerContent from "./DrawerContent";
import HomeStack from "./HomeStack";
import CustomNavBar2 from "./CustomNavBar";

const Drawer = createDrawerNavigator();

export default function AppDrawer(props) {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition:'right',
      }}
    >
      <Drawer.Screen name="HomeStack" component={HomeStack} />
    </Drawer.Navigator>
  );
}
