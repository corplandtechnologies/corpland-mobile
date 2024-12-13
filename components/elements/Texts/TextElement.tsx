import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { TextProps } from "../../../interfaces";
import { COLORS } from "../../../utils/color";

const TextElement: FC<TextProps> = ({
  children,
  fontFamily,
  fontSize,
  color,
  textAlign,
}) => {
  return (
    <Text
      style={{
        fontFamily: fontFamily ? fontFamily : "poppinsSemiBold",
        fontSize: fontSize ? fontSize : 14,
        color: color ? color : COLORS.PRIMARY,
        textAlign: textAlign ? textAlign : "auto",
      }}
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
