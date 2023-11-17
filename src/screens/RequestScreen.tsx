import { StyleSheet, View } from "react-native";
import React from "react";
import { useTheme, Text, Button } from "react-native-paper";

const RequestScreen = () => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.primaryContainer },
      ]}
    >
      <Text
        style={{ color: theme.colors.onPrimaryContainer }}
        variant="titleLarge"
      >
        Requests
      </Text>
      <Text
        style={{ color: theme.colors.onPrimaryContainer }}
        variant="bodyMedium"
      >
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium,
        eum placeat quibusdam voluptate mollitia aliquam error est magnam neque
        fugiat magni consequuntur nesciunt. Voluptas provident harum saepe
        laudantium vero officia.
      </Text>
    </View>
  );
};

export default RequestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
});
