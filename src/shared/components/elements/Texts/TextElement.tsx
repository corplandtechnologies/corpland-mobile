import { StyleSheet, Text } from "react-native";
import React, { FC } from "react";
import { useTheme } from "@app/providers/ThemeProvider";
import { TextProps } from "@core/interfaces/text.interface";

const TextElement: FC<TextProps> = ({
  children,
  fontFamily,
  fontSize,
  color,
  textAlign,
}) => {
  const { theme } = useTheme();
  return (
    <Text
      style={{
        fontFamily: fontFamily ? fontFamily : "PoppinsSemiBold",
        fontSize: fontSize ? fontSize : 14,
        color: color ? color : theme.PRIMARY,
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
