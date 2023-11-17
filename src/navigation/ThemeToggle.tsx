import * as React from "react";
import { Button, IconButton, Tooltip, useTheme } from "react-native-paper";
import { PreferencesContext } from "../context/PreferencesContext";

const ThemeToggle = (): React.ReactNode => {
  const theme = useTheme();

  const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);
  return (
    <Button
      icon="theme-light-dark"
      mode="contained"
      onPress={toggleTheme}
      compact
    >
      {isThemeDark ? "Light Mode" : "Dark Mode"}
    </Button>
  );
};

export default ThemeToggle;
