import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import {
  Button,
  useTheme
} from 'react-native-paper';

import GroupMember from '../../components/GroupMember';
import * as AppConstants from '../../constants/constants';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/firebase'

export default function GroupMembersScreen({ route, navigation }) {
  const theme = useTheme();
  const { receiptId } = route.params;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    try {
      const receiptsColRef = collection(db, 'receipts');
      const receiptDocRef = doc(receiptsColRef, receiptId);

      onSnapshot(receiptDocRef, (doc) => {
        if (doc.data()) {
          const users = doc.data()?.users.map((user: any, index: any) => ({
            id: index,
            ...user
          }));
          setUsers(users);
        }
      })

    } catch (error) {
      console.error('Error retrieving users in the receipt group:', error);
      throw error;
    }
  }, []);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.primaryContainer },
      ]}>
      <FlatList
        data={users}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <GroupMember  {...item} />}
        style={styles.flatList}
      />

      <View style={styles.bottomButtons}>
        <Button
          mode="contained"
          buttonColor="white"
          textColor="black"
          contentStyle={styles.button}
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("Add Member", {receiptId: receiptId})}>
          {AppConstants.LABEL_AddMember}
        </Button>
        <Button
          mode="contained"
          buttonColor="black"
          contentStyle={styles.button}
          style={styles.buttonContainer}
          onPress={() => navigation.pop(3)}>
          {AppConstants.LABEL_Done}
        </Button>
      </View>
    </View>
  )
}

const { width } = Dimensions.get("screen");

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
  },
  surface: {
    width: width * 0.85,
    marginTop: width * 0.075
  },
});