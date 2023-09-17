import React, {useCallback, useContext, useEffect, useState} from 'react';
import Storage from '@react-native-async-storage/async-storage';
import DocumentAnalysisClient from '@azure/ai-form-recognizer';

import { IUseAzureAI } from '../constants/types';


export const AzureAIContext = React.createContext({});

export const AzureAIProdiver = ({children}: {children: React.ReactNode}) => {

  const contextValue = {

  };

  return (
    <AzureAIContext.Provider value={contextValue}>{children}</AzureAIContext.Provider>
  );
};

export const useData = () => useContext(AzureAIContext) as IUseAzureAI;
