import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ViewElementProps } from "./viewElement.interface";
import { useTheme } from "../../../context/ThemeContext";
const ViewElement: React.FC<ViewElementProps> = ({
  children,
  style,
  height,
  safeAreaView,
  backgroundColor,
  scrollView,
  props,
}) => {
  const { theme } = useTheme();
  return (
    <>
      {safeAreaView ? (
        <SafeAreaProvider>
          <SafeAreaView
            style={[
              {
                backgroundColor: backgroundColor
                  ? backgroundColor
                  : theme.SECONDARY,
                height: height ? height : "100%",
              },
              style,
            ]}
          >
            {children}
          </SafeAreaView>
        </SafeAreaProvider>
      ) : (
        <>
          {scrollView ? (
            <SafeAreaProvider>
              <SafeAreaView
                style={[
                  {
                    backgroundColor: backgroundColor
                      ? backgroundColor
                      : theme.SECONDARY,
                    height: height ? height : "100%",
                  },
                  style,
                ]}
              >
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  {...props}
                >
                  {children}
                </ScrollView>
              </SafeAreaView>
            </SafeAreaProvider>
          ) : (
            <View
              style={[
                {
                  backgroundColor: backgroundColor
                    ? backgroundColor
                    : theme.SECONDARY,
                  height: height,
                },
                style,
              ]}
            >
              {children}
            </View>
          )}
        </>
      )}
    </>
  );
};

export default ViewElement;

const styles = StyleSheet.create({});
