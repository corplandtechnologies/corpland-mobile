import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { useTheme } from "@app/providers/ThemeProvider";
import { MainViewProps } from '@core/interfaces/mainView.interface';

const MainView : FC<MainViewProps> = ({ children, style }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.SECONDARY }, style]}>
      {children}
    </View>
  )
}

export default MainView

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 20,
  },
});
