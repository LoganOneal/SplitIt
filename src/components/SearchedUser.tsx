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

import { ISearchedUser } from '../constants/types';

export default function SearchedUser({ name, uid, onReceipt }: ISearchedUser) {
  return (
    <View>
      <List.Item
        title={name}
        style={onReceipt ? styles.onReceipt : styles.notOnReceipt}
        right={props =>
          (onReceipt ?
            <Ionicons
              name={'checkmark-outline'}
              size={20}
            /> :
            <Ionicons
              name={'add-outline'}
              size={20}
            /> 
          )
        }
      />
      <Divider />
    </View>
  )
}

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  onReceipt: {
    backgroundColor: "#e6e6e6",
    paddingStart: 5
  },
  notOnReceipt: {
    backgroundColor: "white",
    paddingStart: 5
  }
});