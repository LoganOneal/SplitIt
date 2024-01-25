import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import ReceiptCard from '../components/ReceiptCard';
import { StyleSheet, View } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import { useData } from '../hooks/useData';
import { IReceipt } from '../interfaces/IReceipt';
import { useFirestore } from '../hooks/useFirestore';

const MyReceipts = () => {
    const { getHostReceipts } = useFirestore();
    const theme = useTheme();
    const data = useData();
    const [receipts, setReceipts] = useState<IReceipt[]>([]);

    // init articles
    useEffect(() => {
        const fetchData = async () => {
            try {
              const receipts = await getHostReceipts();
              console.log(receipts)
              setReceipts(receipts);
            } catch (error) {
              console.error('Error fetching host receipts:', error);
            }
        } 
        fetchData();

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
                style={{ paddingHorizontal: 12 }}
                contentContainerStyle={{ paddingBottom: 30 }}
                renderItem={({ item }) => <ReceiptCard  {...item} />}
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
});
