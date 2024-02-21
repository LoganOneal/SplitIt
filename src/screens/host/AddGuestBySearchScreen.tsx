import React, { useEffect, useState } from 'react';
import { 
  Dimensions,
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity 
} from 'react-native';
import {
  Button,
  Surface,
  useTheme,
  Text,
  TextInput
} from'react-native-paper';
import { useDebounce } from 'use-debounce';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';  

import { db } from '../../services/firebase'
import * as AppConstants from '../../constants/constants';
import { ISearchedGuest } from '../../constants/types';
import SearchedUser from '../../components/SearchedUser';
import { useFirestore } from '../../hooks/useFirestore';

export default function AddGuestBySearchScreen({ route, navigation }) {
  const theme = useTheme();
  const [search, setSearch] = useState("")
  const [searchQuery] = useDebounce(search, 1000)
  const usersInit: ISearchedGuest[] = []
  const [users, setUsers] = useState(usersInit);
  const [loading, setLoading] = useState(false);
  const { receiptId } = route.params;
  const { addExistingUserToReceipt } = useFirestore();
  const [noUsersFoundAlert, setNoUsersFoundAlert] = useState("")

  useEffect(() => {
    setNoUsersFoundAlert("");
    const searchQueryLen = searchQuery.length;
    const endCodeFront = searchQuery.slice(0, searchQueryLen - 1);
    const endCodeBack = searchQuery.slice(searchQueryLen - 1, searchQueryLen);
    const startCode = searchQuery;
    const endCode = endCodeFront + String.fromCharCode(endCodeBack.charCodeAt(0) + 1);

    const usersColRef = collection(db, "users");
    const q = query(
      usersColRef,
      where("name", ">=", startCode),
      where("name", "<", endCode)
    );
    
    getDocs(q).then(async (res) => {
      const usersFromSearch: ISearchedGuest[] = [];
      const receiptsColRef = doc(db, 'receipts', receiptId);
      const receiptDoc = await getDoc(receiptsColRef);
      const host = receiptDoc.data()?.host;
      const users = receiptDoc.data()?.guests;

      res.forEach((doc) => {
        if (doc.data()) {
          usersFromSearch.push({
            name: doc.data()?.name,
            email: (doc.data()?.email.length > 0 ? doc.data()?.email : "No Email"),
            uid: doc.id,
            onReceipt: (doc.id == host || users.includes(doc.id) ? true : false)
          });
        }
      });
      setUsers(usersFromSearch);
      if (usersFromSearch.length == 0 && searchQueryLen > 0) {
        setNoUsersFoundAlert("No Users Found");
      }
    })
  }, [searchQuery])

  const handleAddMember = async (uid: string) => {
    setLoading(true);
    await addExistingUserToReceipt(receiptId, uid).then(() => {
      setLoading(false);
      navigation.goBack();
    });
  }

  return (
    <View
    style={[
      styles.container,
      { backgroundColor: theme.colors.primaryContainer },
    ]}>
      <TextInput
        label={AppConstants.LABEL_SearchName}
        placeholder={AppConstants.PLACEHOLDER_Name}
        onChangeText={(val) => setSearch(val)}
        value={search}
        mode="outlined"
        keyboardType="default"
        style={styles.searchTextInput} />
      
      {users.length > 0 ?
        <FlatList
          data={users}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            item.onReceipt ?
              <SearchedUser  {...item} /> :
              <TouchableOpacity onPress={() => handleAddMember(item.uid)} activeOpacity={0.75}>
                <SearchedUser  {...item} />
              </TouchableOpacity>
            )
          }
          style={styles.flatList}
        /> :
        <Text variant="titleMedium" style={styles.noMatchText}>{noUsersFoundAlert}</Text>
      }
    </View>
  )
}

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  flatList: {
    width: width * 0.85,
    marginTop: width * 0.075,
  },
  searchTextInput: {
    width: width * 0.85,
    marginTop: width * 0.075
  },
  noMatchText: {
    marginTop: 20
  },  
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 1,
  },
});