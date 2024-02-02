import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { Button, Card, Input, Text, Icon } from '@ui-kitten/components';

const CameraIcon = (props): IconElement => (
  <Icon
    {...props}
    name='camera-outline'
  />
);

const Header = (props: ViewProps): React.ReactElement => (
  <View {...props} style={styles.header}>
    <Text category='h3'>
      Join a Receipt
    </Text>
  </View>
);

const JoinReceiptScreen = ({ navigation }): React.ReactElement => {
  const [value, setValue] = React.useState('');

  const handleInputChange = (nextValue: string) => {
    const formattedValue = nextValue.replace(/\D/g, '').slice(0, 8).replace(/(\d{4})(\d{0,4})/, '$1-$2');
    setValue(formattedValue);
  };

  return (
    <View style={styles.container}>
      <Card
        style={styles.card}
        header={Header}
      >
        <Input
          label='Invite Code'
          style={styles.input}
          placeholder='####-####'
          value={value}
          onChangeText={handleInputChange}
          keyboardType='numeric'
        />
        <Button
          style={styles.joinButton}
          status='primary'
          appearance='outline'
          onPress={() => navigation.navigate('JoinReceipt')}
        >
          JOIN RECEIPT
        </Button>
        <Button
          style={styles.qrButton}
          status='secondary'
          appearance='outline'
          onPress={() => navigation.navigate('JoinReceipt')}
          accessoryLeft={CameraIcon}
        >
          SCAN QR CODE
        </Button>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    marginBottom: 35,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 40
  },
  card: {
    alignItems: 'center'
  },
  input: {
    margin: 2,
    width: "100%"
  },
  joinButton: {
    marginTop: 20,
  },
  qrButton: {
    marginTop: 100,
  }
});

export default JoinReceiptScreen;