import React, { FC } from "react";
import { StyleSheet, Text } from "react-native";
import { textElementProps } from "./interfaces/textElement.interface";
import { useTheme } from "../../../context/ThemeContext";

const TextElement: FC<textElementProps> = ({
  children,
  fontFamily,
  fontSize,
  textAlign,
  style,
  color,
}) => {
  const { theme } = useTheme();
  return (
    <Text
      style={[
        {
          fontFamily: fontFamily ? fontFamily : "poppinsRegular",
          fontSize: fontSize ? fontSize : 14,
          color: color ? color : theme.PRIMARY,
          textAlign: textAlign ? textAlign : "auto",
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default TextElement;

const styles = StyleSheet.create({
  main: {
    flexDirection: "column",
  },
});
