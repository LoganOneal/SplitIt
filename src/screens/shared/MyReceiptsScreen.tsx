import React, { useEffect, useState } from 'react';
import { ListRenderItemInfo, StyleSheet, View, TouchableOpacity} from 'react-native';
import { Card, List, Text } from '@ui-kitten/components';
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

const MyReceiptsScreen = ({navigation}): React.ReactElement => {
  const { getHostReceipts, getRequestedReceipts } = useFirestore();
  const [hostReceipts, setHostReceipts] = useState<IReceipt[]>([]);
  const [requestedReceipts, setRequestedReceipts] = useState<IReceipt[]>([]);
  const [activeButton, setActiveButton] = useState('My Receipts');
  const dispatch = useAppDispatch();
  // fetch receipts
  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const hostReceipts = await getHostReceipts();
        setHostReceipts(hostReceipts);
        const requestedReceipts = await getRequestedReceipts();
        setRequestedReceipts(requestedReceipts);
  
        console.log(hostReceipts)
        console.log(requestedReceipts)
      } catch (error) {
        console.error('Error fetching host receipts:', error);
      }
    }
    fetchReceipts();
  }, []);

  const renderContent = () => {
    switch (activeButton) {
      case 'My Receipts':
        return (
          <FlatList
          data={hostReceipts}
          showsVerticalScrollIndicator={true}
          keyExtractor={(item, index) => String(item?.id || index)}
          style={{ width: '100%'}}
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
            style={{ width: '100%'}}
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
        <TouchableOpacity
          style={[styles.button, activeButton === 'My Receipts' && styles.activeButton]}
          onPress={() => setActiveButton('My Receipts')}
        >
          <Text style={[styles.buttonText, activeButton === 'My Receipts' && styles.activeButtonText]}>My Receipts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, activeButton === 'Requested Receipts' && styles.activeButton]}
          onPress={() => setActiveButton('Requested Receipts')}
        >
          <Text style={[styles.buttonText, activeButton === 'Requested Receipts' && styles.activeButtonText]}>Requested Receipts</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
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
    backgroundColor: '#e0e0e0',
    padding: 10,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: '#5E4DAA',
  },
  buttonText: {
    color: '#000',
  },
  activeButtonText: {
    color: '#FFF', 
  },
  content: {
    flex: 1,
  },
});

export default MyReceiptsScreen;