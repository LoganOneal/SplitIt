import React, { useEffect, useState } from 'react';
import { ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { useData } from '../../hooks/useData';
import { IReceipt } from '../../interfaces/IReceipt';
import { useFirestore } from '../../hooks/useFirestore';
import ReceiptCard from '../../components/ReceiptCard';
import { FlatList } from 'react-native';
import { Button, Icon, IconElement, Layout, Spinner } from '@ui-kitten/components';
import { useAppDispatch } from "../../store/hook";
import { userLoggedOut } from "../../store/authSlice";

const PlusIcon = (props): IconElement => (
  <Icon
    {...props}
    name='plus'
  />
);

const LogOutIcon = (props): IconElement => (
  <Icon
    {...props}
    name='log-out-outline'
  />
);

const MyReceiptsScreen = ({navigation}): React.ReactElement => {
  const { getHostReceipts } = useFirestore();
  const [receipts, setReceipts] = useState<IReceipt[]>([]);
  const dispatch = useAppDispatch();

  // fetch receipts
  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const receipts = await getHostReceipts();
        setReceipts(receipts);
        console.log(receipts)
      } catch (error) {
        console.error('Error fetching host receipts:', error);
      }
    }
    fetchReceipts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <FlatList
          data={receipts}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => `${item?.id}`}
          style={{ paddingHorizontal: 12 }}
          contentContainerStyle={{ paddingBottom: 30 }}
          renderItem={({ item }) => <ReceiptCard  {...item} />}
        />
      </View>
      <View style={styles.lowerRow}>
        <Button
          style={styles.button}
          status='primary'
          accessoryLeft={PlusIcon}
          onPress={() => navigation.navigate('Join Receipt')}

        >
          JOIN RECEIPT
        </Button>
        <Button
          style={styles.button}
          status='primary'
          accessoryLeft={PlusIcon}
          onPress={() => navigation.navigate('Create Receipt')}

        >
          ADD RECEIPT
        </Button>
        <Button
          appearance='outline'
          style={styles.button}
          status='primary'
          accessoryLeft={LogOutIcon}
          onPress={() => {
            dispatch(userLoggedOut());
            navigation.navigate('SignIn');
          }}
        >
          LOG OUT
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  upperRow: {
    flex: 6.9,  // Takes up 80% of the screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerRow: {
    flex: 3.1,  // Takes up 20% of the screen
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  button: {
    marginTop: 20,
    width: 300,
  },
});

export default MyReceiptsScreen;