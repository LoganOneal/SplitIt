import React from 'react';
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import {
  Button,
  Surface,
  TextInput,
  useTheme,
  Snackbar,
  Text,
  ActivityIndicator,
} from "react-native-paper";

import { MEMBERS } from "../constants/mocks";
import GroupMember from '../components/GroupMember';

export default function GroupMembersScreen({ navigation }) {
  const theme = useTheme();
  const members = MEMBERS


  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.primaryContainer },
      ]}>
      <FlatList
        data={members}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => `${item?.id}`}
        renderItem={({ item }) => <GroupMember  {...item} />}
        style={styles.flatList}
      />
      <View style={styles.bottomButtons}>
        <Button
          mode="contained"
          buttonColor="white"
          textColor='black'
          contentStyle={styles.button}
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("Add Member")}>
          Add Member +
        </Button>
        <Button
          mode="contained"
          buttonColor="black"
          contentStyle={styles.button}
          style={styles.buttonContainer}
          onPress={() => {}}>
          Create Group
        </Button>
      </View>
    </View>
  )
}

const { width } = Dimensions.get("screen");
const qrcode_side_length = width * 0.85;

const styles = StyleSheet.create({
  button: {
    width: width * 0.85,
    height: 50,
  },
  bottomButtons: {
    marginBottom: 50
  },
  buttonContainer: {
    borderRadius: 0,
    marginTop: 20
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 1,
  },
  flatList: {
    width: width * 0.85,
    marginTop: width * 0.075,
    height: "fit-content"
  },
  surface: {
    width: width * 0.85,
    marginTop: width * 0.075
  },
});