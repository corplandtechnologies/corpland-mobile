import { View, Text } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

const ScreenContextWrapper = ({ children }: { children: React.ReactNode }) => {
  const [fontsLoaded] = useFonts({
    Raleway: require("../fonts/Raleway-Regular.ttf"),
  });
  return (
    <SafeAreaProvider>
      <SafeAreaView className="">
        <View>
          {children}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ScreenContextWrapper;
