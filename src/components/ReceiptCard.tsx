import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { isRejected } from '@reduxjs/toolkit';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const ReceiptCard = ({
  title,
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
}: IReceipt) => (
    <Card style={{ paddingHorizontal: 20, marginVertical: 30 }}>
      <Card.Title title={title} subtitle={location.city + ", " + location.state} />
      <Card.Content>
        <Text variant="titleLarge">Host: {host.name}</Text>
        <Text variant="bodyMedium">Members: {members.map(member => member.name).join(', ')}</Text>
      </Card.Content>
      <Card.Cover source={{ uri: image }} />
    </Card>
);

export default ReceiptCard;