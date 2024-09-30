import { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../../utils/color";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

interface BackButtonProps {
  details?: boolean;
}
const OptionsButton: FC<BackButtonProps> = ({ details }) => {
  const navigation: any = useNavigation();

  const detailStyles = details
    ? {
        backgroundColor: COLORS.SECONDARY,
        borderWidth: 0,
      }
    : {};
  return (
    <TouchableOpacity
      onPress={() => console.log("Options")}
      style={[styles.backButton, detailStyles]}
    >
      <Icon name="ellipsis-vertical-outline" size={24} color={COLORS.PRIMARY} />
    </TouchableOpacity>
  );
};
export default OptionsButton;

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 10,
    borderRadius: 9999,
    borderColor: COLORS.TERTIARY,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    padding: 10,
  },
});
