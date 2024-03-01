import React from "react";
import { useTheme } from "react-native-paper";
import { Text } from "@ui-kitten/components";

interface PasswordRequirementsProps {
  password: string;
  show: boolean;
}

const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({
  password,
  show,
}) => {
  const theme = useTheme();

  if (show) {
    return null;
  }

  const renderRequirement = (condition: boolean, requirement: string) => {
    const icon = condition ? "✓" : "✗";
    const color = condition ? "green" : theme.colors.error;
    return (
      <Text key={requirement} style={{ color, margin: -5 }}>
        [{icon}] {requirement}
        {"\n"}
      </Text>
    );
  };

  return (
    <>
      <Text 
        category="p1"
        style={{ marginTop: 8, marginBottom: 10 }}>
        Password must include:
      </Text>
      {renderRequirement(password.length >= 8, "At least 8 characters")}
      {renderRequirement(
        !!password.match(/[A-Z]/),
        "At least one uppercase character"
      )}
      {renderRequirement(
        !!password.match(/[a-z]/),
        "At least one lowercase character"
      )}
      {renderRequirement(
        !!password.match(/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/),
        "At least one special character"
      )}
      {renderRequirement(!!password.match(/[0-9]/), "At least one number")}
    </>
  );
};

export default React.memo(PasswordRequirements);
