import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ProfileMenuItem from "../components/ProfileMenuItem";
import MainView from "../components/elements/Views/MainView";
import ConfirmationModal from "../components/ConfirmationModal";
import { useApp } from "../context/AppContext";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteAccount } from "../api/api";
import { handleError } from "../utils";
import SnackBar from "../components/ui/SnackBar";

const Settings = () => {
  const navigation: any = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    snackbarVisible,
    setSnackbarVisible,
    setSnackbarMessage,
    snackbarMessage,
    user,
  }: any = useApp();
  console.log(user);

  const [deleteAccountLoading, setDeleteAccountLoading] =
    useState<boolean>(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const handleAccountDelete = async (
    setLoadingState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoadingState(true);
    try {
      const res = await deleteAccount(user?._id);
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("token");
      navigation.navigate("Login");
      setSnackbarMessage(res.data?.message);
      setSnackbarVisible(true);
      setIsModalVisible(false);
      setLoadingState(false);
    } catch (error) {
      console.log(error);
      setSnackbarMessage(handleError(error));
      setSnackbarVisible(true);
      setLoadingState(false);
    } finally {
      setLoadingState(false);
      setSnackbarVisible(false);
    }
  };
  return (
    <MainView>
      <ProfileMenuItem
        title="Delete Account"
        iconName="card-outline"
        onPress={showModal}
      />
      <ConfirmationModal
        isVisible={isModalVisible}
        onClose={hideModal}
        onConfirm={() => {
          handleAccountDelete(setDeleteAccountLoading);
        }}
        modalTitle="Are you sure you want to delete your account?"
        ConfirmButtonText={deleteAccountLoading ? "Loading..." : "Delete"}
      />
      <SnackBar
        setSnackbarVisible={setSnackbarVisible}
        snackbarVisible={snackbarVisible}
        snackbarMessage={snackbarMessage}
      />
    </MainView>
  );
};

export default Settings;

const styles = StyleSheet.create({});
