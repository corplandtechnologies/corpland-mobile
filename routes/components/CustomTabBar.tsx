import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { COLORS } from "../../utils/color";

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? (options.tabBarLabel as string)
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={isFocused ? styles.tabFocused : styles.tab}
            key={index}
          >
            <Icon
              name={
                isFocused
                  ? (options.tabBarIcon as any)
                  : `${options.tabBarIcon}-outline`
              }
              color={isFocused ? COLORS.PRIMARY : COLORS.TERTIARY}
              size={25}
            />
            {/* <Text style={{ color: isFocused ? COLORS.PRIMARY : COLORS.GRAY }}>
              {label}
            </Text> */}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 20,
  },
  tab: {
    alignItems: "center",
    padding: 20,
  },
  tabFocused: {
    alignItems: "center",
    backgroundColor: COLORS.GRAY_LIGHT,
    borderRadius: 20,
    padding: 20,
  },
});

export default CustomTabBar;
