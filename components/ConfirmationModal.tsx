// LogoutConfirmationModal.tsx
import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../utils/color";

interface ConfirmationModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  modalTitle: string;
  ConfirmButtonText: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isVisible,
  onClose,
  onConfirm,
  modalTitle,
  ConfirmButtonText,
}) => {
 
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalText}>{modalTitle}</Text>
        <View style={styles.modalButtons}>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={onClose}>
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButtonConfirm}
            onPress={onConfirm}>
            <Text style={styles.modalButtonTextConfirm}>
              {ConfirmButtonText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    height: "50%",
  },
  modalText: {
    fontSize: 20,
    textAlign: "center",
    margin: 24,
    fontFamily: "InterBold",
    color: COLORS.SECONDARY,
  },
  modalSubText: {
    fontSize: 16,
    textAlign: "center",
    margin: 8,
    color: "#888",
    fontFamily: "InterRegular",
  },
  modalButtons: {
    flexDirection: "column",
    justifyContent: "space-around",
    width: "80%",
    gap: 20,
  },
  modalButton: {
    backgroundColor: COLORS.SECONDARY,
    padding: 20,
    borderRadius: 5,
  },
  modalButtonConfirm: {
    backgroundColor: "red",
    padding: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    textAlign: "center",
    fontFamily: "InterBold",
  },
  modalButtonTextConfirm: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "InterBold",
  },
});

export default ConfirmationModal;
