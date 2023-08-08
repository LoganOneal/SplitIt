import 'react-native-gesture-handler';
import React from 'react';

import {DataProvider} from './src/hooks';
import AppNavigation from './src/navigation/App';
import { FirebaseProvider } from './src/hooks/useFirebase';

export default function App() {
  return (
    <FirebaseProvider>
      <DataProvider>
        <AppNavigation />
      </DataProvider>
    </FirebaseProvider>
  );
}
