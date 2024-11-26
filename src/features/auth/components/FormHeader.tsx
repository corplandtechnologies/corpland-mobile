import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import TextElement from "@shared/components/elements/Texts/TextElement";
import { useTheme } from "@app/providers/ThemeProvider";
import { FormHeaderProps } from "@core/interfaces/formHeader.interface";

const FormHeader: FC<FormHeaderProps> = ({ title, description }) => {
  const { theme } = useTheme();
  return (
    <View style={styles.formHeaderView}>
      <TextElement fontSize={24} fontFamily="PoppinsSemiBold">
        {title}
      </TextElement>
      <TextElement
        fontSize={16}
        fontFamily="PoppinsRegular"
        color={theme.TERTIARY_DARK}
        textAlign="center"
      >
        {description}
      </TextElement>
    </View>
  );
};

export default FormHeader;

const styles = StyleSheet.create({
  formHeaderView: {
    gap: 10,
    alignItems: "center",
  },
});
