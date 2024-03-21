import React, { useEffect, useState } from 'react';
import { ListRenderItemInfo, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Card, List, Text } from '@ui-kitten/components';
import { useData } from '../../hooks/useData';
import { IReceipt } from '../../interfaces/IReceipt';
import { useFirestore } from '../../hooks/useFirestore';
import ReceiptCard from '../../components/ReceiptCard';
import { FlatList } from 'react-native';
import { Button, Icon, IconElement, Layout, Spinner } from '@ui-kitten/components';
import { useAppDispatch } from "../../store/hook";
import { userLoggedOut } from "../../store/authSlice";

const MyReceiptsScreen = ({ navigation }): React.ReactElement => {

  const { getUserReceipts } = useFirestore();
  const [hostReceipts, setHostReceipts] = useState<IReceipt[]>([]);
  const [requestedReceipts, setRequestedReceipts] = useState<IReceipt[]>([]);
  const [activeButton, setActiveButton] = useState('My Receipts');
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  // fetch receipts
  useEffect(() => {
    console.log("is loading", isLoading)
    const fetchReceipts = async () => {
      try {
        setIsLoading(true);
        const { hostReceipts, requestedReceipts } = await getUserReceipts();
        setHostReceipts(hostReceipts);
        setRequestedReceipts(requestedReceipts);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching host receipts:', error);
      }
    }
    fetchReceipts();
    console.log("is loading", isLoading)
  }, []);

  const renderContent = () => {
    switch (activeButton) {
      case 'My Receipts':
        return (
          <FlatList

            data={hostReceipts}
            showsVerticalScrollIndicator={true}
            keyExtractor={(item, index) => String(item?.id || index)}
            style={{ width: '100%' }}
            contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 45 }}
            renderItem={({ item }) => <ReceiptCard  {...item} />}
          />
        );
      case 'Requested Receipts':
        return (
          <FlatList
            data={requestedReceipts}
            showsVerticalScrollIndicator={true}
            keyExtractor={(item, index) => String(item?.id || index)}
            style={{ width: '100%' }}
            contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 45 }}
            renderItem={({ item }) => <ReceiptCard  {...item} />}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          style={[styles.button, activeButton === 'My Receipts' ? styles.activeButton : styles.inactiveButton]}
          onPress={() => setActiveButton('My Receipts')}
        >
          <View>
            <Text category="s1" style={[styles.buttonText, activeButton === 'My Receipts' && styles.activeButtonText]}>My Receipts</Text>
          </View>
        </Button>
        <Button
          style={[styles.button, activeButton === 'Requested Receipts' ? styles.activeButton : styles.inactiveButton]}
          onPress={() => setActiveButton('Requested Receipts')}
        >
          <View>
            <Text category="s1" style={[styles.buttonText, activeButton === 'Requested Receipts' && styles.activeButtonText]}>Requested Receipts</Text>
          </View>
        </Button>
      </View>

      <View style={styles.content}>
        {isLoading && <View style={styles.loadingContainer}><Spinner size="giant"/></View>}

        {renderContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  button: {
    flex: 1,
    // backgroundColor: '#e0e0e0',
    padding: 0,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: "center",
    height: 45
  },
  activeButton: {
    // backgroundColor: '#5E4DAA',
  },
  buttonText: {
    color: '#fff',
    width: "100%"
  },
  activeButtonText: {
    color: '#FFF',
  },
  content: {
    flex: 1,
  },
  inactiveButton: {
    backgroundColor: "#b0b0b0"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default MyReceiptsScreen;