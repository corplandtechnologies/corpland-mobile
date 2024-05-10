import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Icon } from "react-native-elements";
import { COLORS } from "../../utils/color";

const EditAvatar = () => {
  return (
    <View>
      <View style={styles.circleBackground}>
        <Icon
          name="user"
          type="font-awesome"
          size={30}
          color="#fff"
        />
      </View>
      <Button
        title="Change"
        buttonStyle={styles.editButton}
      />
    </View>
  );
};

export default EditAvatar;

const styles = StyleSheet.create({
  circleBackground: {
    width: 100,
    height: 100,
    borderRadius: 9999,
    backgroundColor: COLORS.TERTIARY,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  editButton: {
    marginTop: 15,
    backgroundColor: COLORS.GRAY,
    borderRadius: 5,
  },
});
