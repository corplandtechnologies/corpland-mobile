import { StyleSheet } from "react-native";
import { ButtonElementProps } from "@core/interfaces/buttonElement.interface";
import { FC } from "react";
import { Button } from "react-native-elements";
import { useTheme } from "@app/providers/ThemeProvider";

const ButtonElement: FC<ButtonElementProps> = ({ title }) => {
  const { theme } = useTheme();
  return (
    <Button
      style={styles.button}
      buttonStyle={{
        backgroundColor: theme.PRIMARY,
        borderRadius: 10,
        padding: 20,
      }}
      titleStyle={{ color: theme.SECONDARY, fontFamily: "PoppinsSemiBold" }}
      title={title}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 10,
  },
});

export default ButtonElement;
