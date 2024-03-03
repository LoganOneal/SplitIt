import { Appbar } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import ThemeToggle from "./ThemeToggle";
import { DrawerActions } from "@react-navigation/native";
import { useState } from "react";
import React from "react";
import { View, TouchableOpacity, Animated } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CustomNavBar({ navigation, route, options, back }) {
  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header style={[{ backgroundColor: "#ffffff" }]}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Action
        icon="menu"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={{ position: "absolute", right: 0 }}
      />
      {/*<Appbar.Content title={title} /> */}
      {/* <ThemeToggle /> */}
    </Appbar.Header>
  );
}
