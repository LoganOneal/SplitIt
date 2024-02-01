import React, { useEffect, useState } from 'react';
import { ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { Card, List, Text } from '@ui-kitten/components';
import { useData } from '../../hooks/useData';
import { IReceipt } from '../../interfaces/IReceipt';
import { useFirestore } from '../../hooks/useFirestore';
import ReceiptCard from '../../components/ReceiptCard';
import { FlatList } from 'react-native';

const data = new Array(8).fill({
  title: 'Item',
});

const MyReceiptsScreen = (): React.ReactElement => {
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

  const renderItem = (props): React.ReactElement => (
    <Card
      style={styles.item}
      status='basic'
    >
      <Text>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
        a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged.
      </Text>
    </Card>
  );

  return (
    <View
      style={[
        styles.contentContainer,
      ]}
    >
      <FlatList
        data={receipts}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => `${item?.id}`}
        style={{ paddingHorizontal: 12 }}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => <ReceiptCard  {...item} />}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    maxHeight: '80%',
  },
  item: {
    marginVertical: 4,
  },
});

export default MyReceiptsScreen;