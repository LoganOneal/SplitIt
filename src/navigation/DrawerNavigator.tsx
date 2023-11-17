import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import RequestScreen from "../screens/RequestScreen";
import DrawerContent from "./DrawerContent";

const Drawer = createDrawerNavigator();

export default function AppDrawer(props) {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Request" component={RequestScreen} />
      {/* <Drawer.Screen name="Request2" component={RequestScreen} />
      <Drawer.Screen name="Request3" component={RequestScreen} />
      <Drawer.Screen name="Request4" component={RequestScreen} />
      <Drawer.Screen name="Request5" component={RequestScreen} />
      <Drawer.Screen name="Request6" component={RequestScreen} />
      <Drawer.Screen name="Request7" component={RequestScreen} />
      <Drawer.Screen name="Request8" component={RequestScreen} />
      <Drawer.Screen name="Request9" component={RequestScreen} />
      <Drawer.Screen name="Request10" component={RequestScreen} /> */}
    </Drawer.Navigator>
  );
}
