import { StyleSheet, View } from "react-native";
import React from "react";
import { useTheme, Text } from "react-native-paper";

const HomeScreen = () => {
  const theme = useTheme();
  return (
    <>
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
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium,
          eum placeat quibusdam voluptate mollitia aliquam error est magnam
          neque fugiat magni consequuntur nesciunt. Voluptas provident harum
          saepe laudantium vero officia.
        </Text>
        <Text
          style={{ color: theme.colors.onPrimaryContainer }}
          variant="titleLarge"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, non?
        </Text>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 15,
  },
});
