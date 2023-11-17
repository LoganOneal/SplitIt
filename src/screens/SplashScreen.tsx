import React from "react";
import { View, Dimensions, StyleSheet, StatusBar } from "react-native";
import { Button, Surface, Text } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import * as AppConstants from "../constants/constants";
import { ImageOverlay } from "../components/image-overlay";
import { PreferencesContext } from "../context/PreferencesContext";

const SplashScreen = ({ navigation }) => {
  const { isThemeDark } = React.useContext(PreferencesContext);

  return (
    <ImageOverlay
      style={styles.container}
      source={require("../../assets/images/splash-pool.jpg")}
    >
      <StatusBar barStyle="light-content" />
      <Animatable.View
        style={[styles.contentContainer]}
        animation="fadeInUpBig"
      >
        <Surface style={styles.surface} elevation={4}>
          <View style={styles.headerContent}>
            <Text variant="displaySmall">{AppConstants.CLIENT_NAME}</Text>
            <Text variant="titleMedium">{AppConstants.APP_SLOGAN}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                flex: 1,
                height: 2,
                marginHorizontal: 10,
                backgroundColor: isThemeDark ? "#fff" : "#000",
              }}
            />
          </View>
          <View style={styles.footerContent}>
            <Text variant="bodyLarge">{AppConstants.SPLASH_TEXT1}</Text>
            <Text variant="bodyLarge">{AppConstants.SPLASH_TEXT2}</Text>
            <Text variant="bodyLarge">{AppConstants.SPLASH_TEXT3}</Text>
            <Button
              icon="arrow-right-bold-circle-outline"
              mode="contained"
              compact
              onPress={() => navigation.navigate("SignIn")}
              style={styles.button}
            >
              Get Started
            </Button>
          </View>
        </Surface>
      </Animatable.View>
    </ImageOverlay>
  );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const container_height = height * 0.4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentContainer: {
    marginHorizontal: 10,
    marginVertical: 100,
  },
  headerContent: {
    padding: 15,
  },
  footerContent: {
    padding: 15,
  },
  button: {
    marginTop: 20,
  },
  surface: {
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
});
