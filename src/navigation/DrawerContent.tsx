import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text, Button, Divider, useTheme } from "react-native-paper";
import ThemeToggle from "./ThemeToggle";
import { useAppDispatch } from "../store/hook";
import { userLoggedOut } from "../store/authSlice";

const DrawerContent = (props) => {
  const [active, setActive] = React.useState("");
  const theme = useTheme();
  const dispatch = useAppDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={styles.container}>
        <Divider style={{ alignSelf: "stretch" }} />
        <View style={styles.containerItem}>
          <ThemeToggle />
        </View>
        <View style={styles.containerItem}>
          <Button
            icon="logout"
            mode="contained-tonal"
            onPress={() => dispatch(userLoggedOut())}
          >
            Log out
          </Button>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

const { height } = Dimensions.get("screen");
const container_height = height * 0.25;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 10,
    height: container_height,
  },
  containerItem: {
    paddingHorizontal: 1,
    paddingVertical: 10,
    width: "100%",
  },
});
