import React from "react";
import { View, Dimensions, StyleSheet, StatusBar } from "react-native";
import { Card, Button, Icon, Text } from "@ui-kitten/components";
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
        <Card style={styles.surface}>
          <View style={styles.headerContent}>
            <Text category="h1">{AppConstants.CLIENT_NAME}</Text>
            <Text category="s1">{AppConstants.APP_SLOGAN}</Text>
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
            <View style={styles.features}>
              <Text category="p1">{AppConstants.SPLASH_TEXT1}</Text>
              <Text category="p1">{AppConstants.SPLASH_TEXT2}</Text>
              <Text category="p1">{AppConstants.SPLASH_TEXT3}</Text>
            </View>
            <Button
              accessoryRight={
                <Icon
                  name="arrow-ios-forward-outline"
                  fill="#ffffff"
                />
              }
              onPress={() => navigation.navigate("SignIn")}
              style={styles.button}
            >
              Get Started
            </Button>
          </View>
        </Card>
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
    alignItems: "center"
  },
  footerContent: {
    padding: 15,
  },
  features: {
    marginVertical: 20
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
