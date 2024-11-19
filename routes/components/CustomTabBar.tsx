import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Animated as RNAnimated,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { COLORS } from "../../utils/color";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import AnimatedView from "../../components/animated/AnimatedView";

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
    <AnimatedView>
      <View style={styles.container}>
        <View style={styles.tabBar}>
          <RNAnimated.View
            style={[
              styles.slidingBarContainer,
              { transform: [{ translateX }] },
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
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.tab}
                key={index}
              >
                <Animated.View style={animatedStyle}>
                  <Icon
                    name={
                      isFocused
                        ? (options.tabBarIcon as any)
                        : `${options.tabBarIcon}-outline`
                    }
                    color={isFocused ? COLORS.GRAY : COLORS.TERTIARY}
                    size={25}
                  />
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </AnimatedView>
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
    backgroundColor: COLORS.PRIMARY,
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
    padding: 20,
    zIndex: 1,
  },
  tabFocused: {
    alignItems: "center",
    backgroundColor: COLORS.GRAY_LIGHT,
    borderRadius: 20,
    padding: 20,
  },
  slidingBarContainer: {
    width: TAB_WIDTH,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.GRAY_LIGHT,
    alignItems: "center",
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
    zIndex: 0,
  },
  slidingBar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.PRIMARY,
    position: "absolute",
    bottom: 20,
  },
});

export default CustomTabBar;
