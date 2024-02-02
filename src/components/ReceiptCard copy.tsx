import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { isRejected } from '@reduxjs/toolkit';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { IReceipt } from '../interfaces/IReceipt';

const ReceiptCard = ({
  location,
  host,
  members,
  items,
  image,
  total,
  received,
  tax,
  tip,
  timestamp,
  vendor
}: IReceipt) => (
    <Card style={{ paddingHorizontal: 20, marginVertical: 30 }}>
      <Card.Title title={vendor} subtitle={location + ", " + location} />
      <Card.Content>
      <Text>Host: not yet implemented</Text>
        {/*
        <Text variant="titleLarge">Host: {host.name}</Text>
        <Text variant="bodyMedium">Members: {members.map(member => member.name).join(', ')}</Text>
*/}
      </Card.Content>
      <Card.Cover source={{ uri: image }} />
    </Card>
);

export default ReceiptCard;