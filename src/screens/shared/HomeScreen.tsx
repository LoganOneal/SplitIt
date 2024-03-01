import { StyleSheet, View } from "react-native";
import React from "react";
import { Text, Button, useTheme, ThemeProvider, Card } from "@ui-kitten/components";
import { useAppSelector } from "../../store/hook";
import { selectAuthState } from "../../store/authSlice";
import { teal100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const HomeScreen = ({navigation}:any) => {
  const theme = useTheme();
  const authState = useAppSelector(selectAuthState);
  return (
    <ThemeProvider theme={theme}>
      <View
        style={[
          styles.container,
        ]}
      >
        <Card>
          <Text category="h1" style={styles.welcome}>
            Welcome,
          </Text>
          <Text category="h1" style={styles.welcome}>
            {authState?.userName ?? "Guest"}!
          </Text>
          <Text category="p1" style={styles.description}>
            Upload, share, and split receipts across various payment platforms in a few easy steps.
          </Text>
          <Button
            style={styles.button}
            onPress={() => navigation.navigate("Receipts and Requests")} 
          >
            CONTINUE
          </Button>
        </Card>
      </View>
    </ThemeProvider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 40,
  },
  button: {
    marginTop: 100,
    width: "100%"
  },
  welcome: {
    // fontWeight: 500
    alignSelf: "center",
  },
  description: {
    marginTop: 100,
    alignSelf: "center",
  }
});
