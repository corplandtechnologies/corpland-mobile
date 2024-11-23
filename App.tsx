import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from "expo-status-bar";
import { AppProviders } from "./providers/AppProviders";
import { navigationRef } from "./navigation/config/navigationRef";
import { linking } from "./navigation/config/linking";
import { useAppInitialization } from './hooks/useAppInitialization';
import { LoadingScreen } from './screens/common/LoadingScreen';
import { OfflineScreen } from './screens/common/OfflineScreen';
import RootNavigator from './navigation/RootNavigator.tsx';

function App() {
  const { 
    isLoading, 
    isConnected, 
    isFontLoaded,
    initialRoute 
  } = useAppInitialization();

  if (!isFontLoaded) return null;
  if (isLoading) return <LoadingScreen />;
  if (!isConnected) return <OfflineScreen />;

  return (
    <>
      <StatusBar translucent={true} />
      <NavigationContainer ref={navigationRef} linking={linking}>
        <RootNavigator initialRoute={initialRoute} />
      </NavigationContainer>
    </>
  );
}

export default function WrappedApp() {
  return (
    <AppProviders>
      <App />
    </AppProviders>
  );
}
