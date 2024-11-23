import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "../../../utils/color";
import ScreenContextWrapper from "../../features/ScreenContextWrapper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

const Touchable = (text = "Select an Option", onPress: () => void) => {
  const TouchableComponent = () => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.touchableContainer}>
        <Text style={styles.touchableText}>{text}</Text>
        <Icon name="chevron-forward" size={24} color={COLORS.PRIMARY} />
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
    <TouchableOpacity onPress={onSelect} style={styles.optionContainer}>
      <Text style={styles.optionText}>{optionText}</Text>
      <Icon name="chevron-forward" size={24} color={COLORS.GRAY} />
    </TouchableOpacity>
  );
};

const Select = ({
  touchableComponent = Touchable,
  touchableText = "Select an Option",
  title,
  options = [],
  onSelect,
  locationRefused = false,
  initialValue,
}: {
  touchableComponent?: typeof Touchable;
  touchableText?: string;
  title: string;
  options?: string[];
  onSelect: (selectedOption: string) => void;
  locationRefused?: boolean;
  initialValue?: string;
}) => {
  const [visible, setVisible] = useState(false);
  const { TouchableComponent } = touchableComponent(touchableText, () =>
    setVisible(true)
  );

  useEffect(() => {
    if (initialValue) {
      onSelect(initialValue); // Assuming onSelect updates the state accordingly
    }
  }, [initialValue]);

  return (
    <View>
      <ScrollView>
        <TouchableComponent />

        <Modal visible={visible} animationType="slide">
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
              }}
            >
              <Icon name="close" size={26} color={COLORS.PRIMARY} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {options.map((item, index) => (
              <Option
                key={index} // It's important to provide a unique key for each child in a list
                optionText={item}
                onSelect={() => {
                  onSelect(item); // Call the passed onSelect function with the selected item
                  setVisible(false); // Close the modal or perform other actions
                }}
              />
            ))}
          </ScrollView>
        </Modal>
      </ScrollView>
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
    marginBottom: 10,
  },
  touchableText: {
    color: COLORS.PRIMARY,
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "PoppinsRegular",
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
    fontFamily: "PoppinsBold",
  },
  title: {
    fontSize: 18,
    marginRight: 40,
    fontWeight: "bold",
    color: COLORS.PRIMARY,
    textAlign: "center",
    fontFamily: "PoppinsBold",
  },
  optionContainer: {
    paddingVertical: 15,
    paddingHorizontal: 7.5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.TERTIARY,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    fontFamily: "PoppinsRegular",
  },
});
