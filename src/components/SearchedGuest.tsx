import React, { useState } from "react";
import { Dimensions, StyleSheet, View, ViewProps } from "react-native";
import { Divider, ListItem, Icon, Text } from '@ui-kitten/components';

import { useFirestore } from "../hooks/useFirestore";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function SearchedUser({item, receiptId, navigation}) {
  const { addExistingUserToReceipt } = useFirestore();
  const [loading, setLoading] = useState(false);

  const handleAddMember = async (uid: string) => {
    setLoading(true);
    await addExistingUserToReceipt(receiptId, uid).then(() => {
      setLoading(false);
      navigation.goBack();
    });
  }

  const Title = (props: ViewProps): React.ReactElement => (
    <View {...props}>
      <Text category='s1'>
        {item.name}
      </Text>
    </View>
  );

  return (
    <View>
      {item.onReceipt ?
        <ListItem
          title={Title}
          description={item.email}
          style={styles.onReceipt}
          accessoryRight={
              <Icon
                name="checkmark-outline"
                fill="#000000"
              />
          }
        /> :
        <ListItem
          title={Title}
          description={item.email}
          style={styles.notOnReceipt}
          accessoryRight={
            <Icon
              name="plus-outline"
              fill="#000000"
            /> 
          }
          onPress={() => handleAddMember(item.uid)}
        />
      }
      <Divider />
    </View>
  )
}

const styles = StyleSheet.create({
  onReceipt: {
    backgroundColor: "#dfdfdf",
    paddingStart: 5,
  },
  notOnReceipt: {
    paddingStart: 5
  }
});