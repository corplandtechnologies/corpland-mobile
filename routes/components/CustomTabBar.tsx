import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Animated as RNAnimated,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useTheme } from "../../context/ThemeContext";
import ViewElement from "../../components/common/View/ViewElement";
import IconElement from "../../components/common/Icon/IconElement";

const { width } = Dimensions.get("window");
const tabsLength = 5;
const MARGIN = 16;
const TAB_BAR_WIDTH = width - MARGIN * 2;
const PADDING = 10;
const TAB_WIDTH = (TAB_BAR_WIDTH - PADDING * 2) / tabsLength;
const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { theme } = useTheme();
  const [translateX] = useState(new RNAnimated.Value(0));

  const translateTab = (index: number) => {
    const targetTranslation = PADDING + index * TAB_WIDTH;

    RNAnimated.spring(translateX, {
      toValue: targetTranslation,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    translateTab(state.index);
  }, [state.index]);

  return (
    <View style={styles.container}>
      <ViewElement style={styles.tabBar}>
        <RNAnimated.View
          style={[
            styles.slidingBarContainer,
            {
              transform: [{ translateX }],
              backgroundColor: theme.TERTIARY_LIGHT,
            },
          ]}
        />
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

          const animatedStyle = useAnimatedStyle(() => {
            return {
              transform: [
                {
                  scale: withSpring(isFocused ? 1.2 : 1),
                },
              ],
            };
          });

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              // testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tab}
              key={index}
            >
              <Animated.View style={animatedStyle}>
                <IconElement
                  name={
                    isFocused
                      ? (options.tabBarIcon as any)
                      : `${options.tabBarIcon}-outline`
                  }
                  color={isFocused ? theme.PRIMARY : theme.TERTIARY}
                  size={25}
                />
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </ViewElement>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: MARGIN,
    left: 20,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    width: TAB_BAR_WIDTH,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    // backgroundColor: COLORS.SECONDARY,
    borderRadius: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: PADDING,
  },
  tab: {
    alignItems: "center",
    padding: 10,
    paddingVertical: 20,
    zIndex: 1,
  },
  slidingBarContainer: {
    width: TAB_WIDTH,
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
    zIndex: 0,
  },
});

export default CustomTabBar;
