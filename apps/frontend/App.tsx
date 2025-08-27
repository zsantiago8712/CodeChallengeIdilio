import Provider from './_trpc/Provider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';

import './global.css';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider>
        <ScreenContent title="Home" path="App.tsx" />
        <StatusBar style="auto" />
      </Provider>
    </SafeAreaProvider>
  );
}
