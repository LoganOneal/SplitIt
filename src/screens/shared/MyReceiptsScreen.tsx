import React, { useEffect, useState } from 'react';
import { ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { Card, List, Text } from '@ui-kitten/components';
import { useData } from '../../hooks/useData';
import { IReceipt } from '../../interfaces/IReceipt';
import { useFirestore } from '../../hooks/useFirestore';
import ReceiptCard from '../../components/ReceiptCard';
import { FlatList } from 'react-native';
import { Button, Icon, IconElement, Layout, Spinner } from '@ui-kitten/components';

const PlusIcon = (props): IconElement => (
  <Icon
    {...props}
    name='plus'
  />
);

const MyReceiptsScreen = ({navigation}): React.ReactElement => {
  const { getHostReceipts } = useFirestore();
  const [receipts, setReceipts] = useState<IReceipt[]>([]);

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
          appearance='outline'
          accessoryLeft={PlusIcon}
          onPress={() => navigation.navigate('JoinReceipt')}

        >
          JOIN RECEIPT
        </Button>
        <Button
          style={styles.button}
          status='primary'
          accessoryLeft={PlusIcon}
          onPress={() => navigation.navigate('CreateReceipt')}

        >
          ADD RECEIPT
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
    martinTop: 10,
    margin: 15,
    width: 300,
  },
});

export default MyReceiptsScreen;