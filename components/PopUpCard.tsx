import React, { FC } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { COLORS } from "../utils/color";
import TextElement from "./elements/Texts/TextElement";
import PrimaryButton from "./ui/PrimaryButton";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
interface PopUpCardProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  actionText: string;
  onPress: () => void;
}

const PopUpCard: FC<PopUpCardProps> = ({
  visible,
  onClose,
  title,
  actionText,
  onPress,
}) => {
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  const navigation: any = useNavigation();

  React.useEffect(() => {
    if (visible) {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
        tension: 150,
        friction: 10,
      }).start();
    } else {
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => onClose()); // Close the modal after the animation
    }
  }, [visible]);

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.modalContainer,
                { transform: [{ scale: scaleValue }] },
              ]}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <Image
                  source={{
                    uri: "https://ik.imagekit.io/4hxqb9ldw/CORPLAND-1-no-bg.png?updatedAt=1725434683316",
                  }}
                  style={{ width: 200, height: 50 }}
                />
                <TextElement fontFamily="PoppinsMedium">{title}</TextElement>
              </View>
              <View style={{ gap: 10 }}>
                <PrimaryButton value={actionText} onPress={onPress} />
                <PrimaryButton
                  secondary
                  value="Cancel"
                  onPress={() => {
                    onClose();
                  }}
                />
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: COLORS.SECONDARY,
    borderRadius: 10,
  },
});

export default PopUpCard;
