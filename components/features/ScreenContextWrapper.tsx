import { View, Text } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const ScreenContextWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>{children}</View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ScreenContextWrapper;
