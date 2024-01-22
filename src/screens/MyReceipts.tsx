import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import ReceiptCard from '../components/ReceiptCard';
import { StyleSheet, View } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import { useData } from '../hooks/useData';
import { IReceipt } from '../constants/types';

const MyReceipts = () => {

    const theme = useTheme();
    const data = useData();
    const [receipts, setReceipts] = useState<IReceipt[]>([]);

    // init articles
    useEffect(() => {
        setReceipts(data?.receipts);
        console.log(data?.receipts.length)
    }, [data.receipts]);

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme.colors.primaryContainer },
            ]}
        >
            <FlatList
                data={receipts}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => `${item?.id}`}
                style={{ paddingHorizontal: 12   }}
                contentContainerStyle={{ paddingBottom: 30 }}
                renderItem={({ item }) => <ReceiptCard  {...item} />}
                style={styles.flatList}
                width={"80%"}
            />
        </View>
    );
};

export default MyReceipts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 1,
  },
  flatList: {
    backgroundColor: "white"
  }
});
