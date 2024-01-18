import React from 'react';
import { Text } from 'react-native-paper';

interface PasswordRequirementsProps {
    password: string;
    successColor: string;
    dangerColor: string;
  }
  
  const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({
    password,
    successColor,
    dangerColor,
  }) => {
    const renderRequirement = (condition: boolean, requirement: string) => {
      const icon = condition ? '✓' : '✗';
      const color = condition ? successColor : dangerColor;
      return (
        <Text key={requirement} style={{ color }}>
          [{icon}] {requirement}
          {'\n'}
        </Text>
      );
    };
  
    return (
      <>
        <Text>Password must include:</Text>
        {renderRequirement(password.length >= 8, 'At least 8 characters')}
        {renderRequirement(
          !!password.match(/[A-Z]/),
          'At least one uppercase character',
        )}
        {renderRequirement(
          !!password.match(/[a-z]/),
          'At least one lowercase character',
        )}
        {renderRequirement(
          !!password.match(/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/),
          'At least one special character',
        )}
        {renderRequirement(!!password.match(/[0-9]/), 'At least one number')}
      </>
    );
  };
  
  export default React.memo(PasswordRequirements);
  
