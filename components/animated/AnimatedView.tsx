import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

interface Props {
  children: React.ReactNode;
  style?: any;
}

const AnimatedView: React.FC<Props> = ({ children, style }) => {
  const slideAnim = useRef(new Animated.Value(500)).current; // Adjust initial value as needed

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      velocity: 2,
      tension: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[{ transform: [{ translateY: slideAnim }] }, style]}>
      {children}
    </Animated.View>
  );
};

export default AnimatedView;
