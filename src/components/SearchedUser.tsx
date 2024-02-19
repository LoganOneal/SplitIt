import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {Ionicons} from '@expo/vector-icons';
import {
  List,
  Divider,
} from "react-native-paper";

import { ISearchedUser } from '../constants/types';

export default function SearchedUser({ name, email, uid, onReceipt }: ISearchedUser) {
  return (
    <View>
      <List.Item
        title={name}
        description={email}
        style={onReceipt ? styles.onReceipt : styles.notOnReceipt}
        right={props =>
          (onReceipt ?
            <Ionicons
              name={'checkmark-outline'}
              size={20}
              style={styles.test}
            /> :
            <Ionicons
              name={'add-outline'}
              size={20}
              style={styles.test}
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
    paddingStart: 5,
  },
  notOnReceipt: {
    backgroundColor: "white",
    paddingStart: 5
  },
  test: {
    alignSelf: "center"
  }
});