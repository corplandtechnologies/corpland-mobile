import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "../../utils/color";
import ScreenContextWrapper from "../ScreenContextWrapper";
import { SafeAreaView } from "react-native-safe-area-context";

const Touchable = (text = "Select an Option", onPress: () => void) => {
  const TouchableComponent = () => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.touchableContainer}>
        <Text style={styles.touchableText}>{text}</Text>
        <Icon
          name="chevron-forward"
          size={24}
          color={COLORS.PRIMARY}
        />
      </TouchableOpacity>
    );
  };

  return { TouchableComponent };
};

const Option = ({
  optionText,
  onSelect,
}: {
  optionText: string;
  onSelect: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onSelect}
      style={styles.optionContainer}>
      <Text style={styles.optionText}>{optionText}</Text>
      <Icon
        name="chevron-forward"
        size={24}
        color={COLORS.PRIMARY}
      />
    </TouchableOpacity>
  );
};

const Select = ({
  touchableComponent = Touchable,
  touchableText = "Select an Option",
  title,
  options = [],
  onSelect,
  locationRefused = false, // New prop to indicate location refusal
}: {
  touchableComponent?: typeof Touchable;
  touchableText?: string;
  title: string;
  options?: string[];
  onSelect: (selectedOption: string) => void;
  locationRefused?: boolean; // New prop
}) => {
  const [visible, setVisible] = useState(false);
  const { TouchableComponent } = touchableComponent(touchableText, () =>
    setVisible(true)
  );

  return (
    <View>
      <TouchableComponent />
      <Modal
        visible={visible}
        animationType="slide">
        <ScreenContextWrapper>
          <SafeAreaView>
            <View style={styles.header}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  console.log("Back icon pressed");
                  setVisible(false);
                }}>
                <Icon
                  name="close"
                  size={26}
                  color={COLORS.PRIMARY}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              data={options} // Use the options prop directly
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Option
                  optionText={item}
                  onSelect={() => {
                    console.log("Option selected:", item);
                    onSelect(item); // Call the passed onSelect function with the selected item
                    setVisible(false); // Close the modal or perform other actions
                  }}
                />
              )}
            />
          </SafeAreaView>
        </ScreenContextWrapper>
      </Modal>
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  touchableContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.SECONDARY,
    padding: 15,
    borderRadius: 10,
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.TERTIARY,
    justifyContent: "space-between",
  },
  touchableText: {
    color: COLORS.PRIMARY,
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "InterRegular",
  },
  header: {
    borderBottomColor: COLORS.PRIMARY,
    borderBottomWidth: 1,
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  titleContainer: {
    flex: 1,
    fontFamily: "InterBold",
  },
  title: {
    fontSize: 18,
    marginRight: 40,
    fontWeight: "bold",
    color: COLORS.PRIMARY,
    textAlign: "center",
    fontFamily: "InterBold",
  },
  optionContainer: {
    paddingVertical: 15,
    paddingHorizontal: 7.5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.PRIMARY,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    fontFamily: "InterRegular",
  },
});
