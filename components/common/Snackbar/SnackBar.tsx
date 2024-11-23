import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Snackbar } from "react-native-paper";

interface SnackBarProps {
  snackbarVisible: boolean;
  setSnackbarVisible: any;
  snackbarMessage: any;
}

const SnackBar: FC<SnackBarProps> = ({
  snackbarVisible,
  setSnackbarVisible,
  snackbarMessage,
}) => {
  return (
    <Snackbar
      visible={snackbarVisible}
      onDismiss={() => setSnackbarVisible(false)}
      action={{
        label: "Close",
        onPress: () => {
          setSnackbarVisible(false);
        },
      }}
    >
      {snackbarMessage}
    </Snackbar>
  );
};

export default SnackBar;

const styles = StyleSheet.create({});
