import React, { useEffect, useState } from 'react';
import { ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { useFirestore } from '../../hooks/useFirestore';
import { FlatList } from 'react-native';
import { Button, Icon, IconElement, Layout, Card } from '@ui-kitten/components';
import { useAppDispatch } from "../../store/hook";
import { IReceipt, IReceiptItem } from '../../constants/types';
import ItemCard from '../../components/ItemCard';
import { useAppSelector } from "../../store/hook";
import { selectAuthState } from "../../store/authSlice";
import { auth } from "../../services/firebase";
import { set } from 'react-hook-form';

const PlusIcon = (props): IconElement => (
  <Icon
    {...props}
    name='plus'
  />
);

const MyReceiptsScreen = ({ route, navigation }: { route: any, navigation: any }): React.ReactElement => {
  const { receiptId, total } = route.params;
  const [receipt, setReceipt] = useState<IReceipt | undefined>(undefined);
  const authState = useAppSelector(selectAuthState);

  const { getReceiptById, updateItemsPaidStatus } = useFirestore();

  const handleCheckout = async () => {

  };

  return (
    <View style={styles.container}>
      <View style={styles.lowerRow}>
        <Card
          style={styles.card}
        >
          <View >
            <View style={styles.rowContainer}>
              <View style={styles.columnContainer}>
                <Text category='s1'>
                  Subtotal:
                </Text>
                <Text category='s1'>
                  Tax + Tip:
                </Text>
                <Text category='s1'>
                  Total:
                </Text>
              </View>
              <View style={styles.columnContainer}>
                <Text category='s1' appearance='hint'>${total}</Text>
                <Text category='s1' appearance='hint'>${total * .11}</Text>
                <Text category='s1' appearance='hint'>${total + total * .11}</Text>
              </View>
            </View>
          </View>
        </Card>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  columnContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginRight: 10,
    marginVertical: 10
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    alignItems: 'center',
  },
  card: {
    width: 300,
    marginVertical: 25,
    shadowColor: 'black',
    shadowOffset: { width: 4, height: 2 },
    shadowRadius: 6,
    justifyContent: 'center',
    alignContent: 'center',
  },
  upperRow: {
    flex: 7,  // Takes up 80% of the screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerRow: {
    flex: 3,  // Takes up 20% of the screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 15,
    margin: 2,
  },
});

export default MyReceiptsScreen;