import React, {useCallback, useContext, useEffect, useState} from 'react';
import Storage from '@react-native-async-storage/async-storage';

import {
  IUseData,
  IReceipt,
} from '../constants/types';

import {
  RECEIPTS,
} from '../constants/mocks';

export const DataContext = React.createContext({});

export const DataProvider = ({children}: {children: React.ReactNode}) => {
  const [receipts, setReceipts] = useState<IReceipt[]>(RECEIPTS);

  const contextValue = {
    receipts, 
    setReceipts,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext) as IUseData;
