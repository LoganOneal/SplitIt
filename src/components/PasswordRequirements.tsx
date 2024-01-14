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

  return (
    <Text>
      Password must include:
      {'\n'}- At least 8 characters{' '}
      <Text color={password.length >= 8 ? colors.success : colors.danger}>
        {password.length >= 8 ? '✓' : '✗'}
      </Text>
      {'\n'}- At least one uppercase letter{' '}
      <Text color={password.match(/[A-Z]/) ? colors.success : colors.danger}>
        {password.match(/[A-Z]/) ? '✓' : '✗'}
      </Text>
      {'\n'}- At least one lowercase letter{' '}
      <Text color={password.match(/[a-z]/) ? colors.success : colors.danger}>
        {password.match(/[a-z]/) ? '✓' : '✗'}
      </Text>
      {'\n'}- At least one number{' '}
      <Text color={password.match(/[0-9]/) ? colors.success : colors.danger}>
        {password.match(/[0-9]/) ? '✓' : '✗'}
      </Text>
      {'\n'}- At least one special character{' '}
      <Text
        color={
          password.match(/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/)
            ? colors.success
            : colors.danger
        }>
        {password.match(/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/) ? '✓' : '✗'}
      </Text>
    </Text>
  );
};

export default React.memo(PasswordRequirements);
