import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {Ionicons} from '@expo/vector-icons';
import {
  Button,
  Surface,
  TextInput,
  useTheme,
  Snackbar,
  Text,
  ActivityIndicator,
  List,
  Divider,
} from "react-native-paper";

import { IGroupMember } from '../constants/types';

export default function GroupMember({ name }: IGroupMember) {
  return (
    <View>
      <List.Item
        title={name}
        style={styles.memberItem}
        right={props => 
          <Ionicons
            name={'person-outline'}
            size={20}
          />
        }
      />
      <Divider />
    </View>
  )
}

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  memberItem: {
    backgroundColor: "white",
    paddingStart: 5
  }
});