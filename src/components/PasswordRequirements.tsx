import React from 'react';
import {Text} from '../components';
import {useTheme} from '../hooks';

interface PasswordRequirementsProps {
  password: string;
}

const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({
  password,
}) => {
  const {colors} = useTheme();

  const renderRequirement = (condition: boolean, requirement: string) => {
    const icon = condition ? '✓' : '✗';
    const color = condition ? colors.success : colors.danger;
    return (
      <Text key={requirement} color={color}>
        [{icon}] {requirement}
        {'\n'}
      </Text>
    );
  };

  return (
    <Text>
      Password must include:
      {'\n'}
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
    </Text>
  );
};

export default React.memo(PasswordRequirements);
