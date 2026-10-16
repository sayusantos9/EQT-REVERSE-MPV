import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SoundProvider} from './src/context/SoundContext';
import {AppProvider} from './src/context/AppContext';
import {AppNavigator} from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <SoundProvider>
        <AppProvider>
          <AppNavigator />
        </AppProvider>
      </SoundProvider>
    </SafeAreaProvider>
  );
}
