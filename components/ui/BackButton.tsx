import { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../../utils/color";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.backButton}>
      <Icon
        name="arrow-back"
        size={24}
        color={COLORS.PRIMARY}
      />
    </TouchableOpacity>
  );
};
export default BackButton;

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
