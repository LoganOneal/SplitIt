import React from "react";
import { View, StyleSheet } from "react-native";
import { Spinner } from "@ui-kitten/components";

const LoadingIndicator = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <View style={styles.modalBackground}>
      <Spinner size="giant" />
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    height: "100%",
  },
});

export default LoadingIndicator;
