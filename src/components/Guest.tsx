import React from "react";
import {StyleSheet, View, ViewProps } from "react-native";
import { Divider, ListItem, Icon, Text } from '@ui-kitten/components';

import { IGuest } from '../constants/types';

export default function Guest({ name }: IGuest) {
  const Title = (props: ViewProps): React.ReactElement => (
    <View {...props}>
      <Text category='s1'>
        {name}
      </Text>
    </View>
  );

  return (
    <View>
      <ListItem
        title={Title}
        style={styles.guest}
        accessoryRight={ 
          <Icon
            name="person-outline"
            fill="#000000"
          />
        }
      />
      <Divider />
    </View>
  )
}

const styles = StyleSheet.create({
  guest: {
    paddingStart: 15,
    fontSize: 30
  },
});