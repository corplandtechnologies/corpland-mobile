import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import MainView from "../../components/elements/Views/MainView";
import TextElement from "../../components/elements/Texts/TextElement";
import Card from "../../components/ui/Card";
import { CheckBox, Icon } from "react-native-elements";
import { COLORS } from "../../utils/color";
import Hr from "../../components/elements/HR/Hr";
import PhoneInput from "react-native-phone-input";
import BottomActionCard from "../../components/BottomActionCard";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { useApp } from "../../context/AppContext";
import SnackBar from "../../components/ui/SnackBar";
import { handleError } from "../../utils";
import { createTransferRecipient } from "../../api/api";
import { useNavigation } from "@react-navigation/native";

const WithdrawalChannel = () => {
  const navigation: any = useNavigation();
  const [selectedBankCode, setSelectedBankCode] = React.useState<string>("MTN");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const {
    user,
    setSnackbarMessage,
    snackbarMessage,
    setSnackbarVisible,
    snackbarVisible,
    setTransferRecipient,
  } = useApp();
  const [proceedLoading, setProceedLoading] = useState<boolean>(false);

  const handleTransferRecipient = async (
    setLoadingState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (!phoneNumber || phoneNumber.length < 10 || phoneNumber.length > 13) {
      setSnackbarMessage("Please provide the receiving number");
      setSnackbarVisible(true);
      return;
    }
    setLoadingState(true);
    try {
      setSnackbarVisible(true);
      setLoadingState(false);
      navigation.navigate("ConfirmWithdraw", {
        accountNumber: phoneNumber,
        channel:
          selectedBankCode === "MTN" ||
          selectedBankCode === "ATL" ||
          selectedBankCode === "VOD"
            ? "mobile_money"
            : "bank_transfer",
      });
    } catch (error: any) {
      setSnackbarMessage(handleError(error));
      setSnackbarVisible(true);
      setLoadingState(false);
    } finally {
      setLoadingState(false);
    }
  };
  return (
    <MainView style={{ padding: 10, justifyContent: "space-between" }}>
      <View>
        <View style={{ paddingBottom: 20, gap: 20 }}>
          <TextElement fontSize={18}>Payment Options</TextElement>
        </View>
        <Card style={styles.paymentOptionsCard}>
          <View style={styles.paymentOptions}>
            <View style={styles.paymentLeft}>
              <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwmjP8b-8u-0h-nU5cTaZERErjQH7Ik_K3EQ&s",
                }}
                style={{ width: 50, height: 50, objectFit: "contain" }}
              />
              <TextElement
                color={COLORS.GRAY}
                fontFamily="poppinsMedium"
                fontSize={16}
              >
                MTN
              </TextElement>
            </View>
            <View style={styles.paymentRight}>
              <CheckBox
                checked={selectedBankCode === "MTN"}
                onPress={() => setSelectedBankCode("MTN")}
                iconType="material-community"
                checkedIcon="radiobox-marked"
                uncheckedIcon="radiobox-blank"
              />
            </View>
          </View>
          <Hr />
          <View style={styles.paymentOptions}>
            <View style={styles.paymentLeft}>
              <Image
                source={{
                  uri: "https://etranzact.com.gh/wp-content/uploads/2023/07/ATM-Logo-01.png",
                }}
                style={{ width: 50, height: 50 }}
              />
              <TextElement
                color={COLORS.GRAY}
                fontFamily="poppinsMedium"
                fontSize={16}
              >
                AirtelTigo
              </TextElement>
            </View>
            <View style={styles.paymentRight}>
              <CheckBox
                checked={selectedBankCode === "ATL"}
                onPress={() => setSelectedBankCode("ATL")}
                iconType="material-community"
                checkedIcon="radiobox-marked"
                uncheckedIcon="radiobox-blank"
              />
            </View>
          </View>
          <Hr />
          <View style={styles.paymentOptions}>
            <View style={styles.paymentLeft}>
              <Image
                source={{
                  uri: "https://citinewsroom.com/wp-content/uploads/2024/05/Telecel-Cash-Logo.jpg",
                }}
                style={{ width: 50, height: 50, objectFit: "contain" }}
              />
              <TextElement
                color={COLORS.GRAY}
                fontFamily="poppinsMedium"
                fontSize={16}
              >
                Telecel
              </TextElement>
            </View>
            <View style={styles.paymentRight}>
              <CheckBox
                checked={selectedBankCode === "VOD"}
                onPress={() => setSelectedBankCode("VOD")}
                iconType="material-community"
                checkedIcon="radiobox-marked"
                uncheckedIcon="radiobox-blank"
              />
            </View>
          </View>
        </Card>
        <View style={styles.inputContainer}>
          {/* <Icon name="phone" type="font-awesome" color={COLORS.GRAY} /> */}
          <PhoneInput
            initialCountry={"gh"}
            textProps={{
              placeholder: "Enter a phone number...",
              cursorColor: COLORS.PRIMARY,
            }}
            // style={styles.input}
            pickerBackgroundColor={COLORS.TERTIARY}
            onChangePhoneNumber={(text) => {
              // Remove any spaces
              let formattedNumber = text.replace(/\s+/g, "");

              setPhoneNumber(formattedNumber);
            }}
            autoFormat={true}
            // You can customize the country list and other props as needed
          />
        </View>
      </View>
      <View>
        <BottomActionCard>
          <PrimaryButton
            value="Proceed"
            onPress={() => {
              handleTransferRecipient(setProceedLoading);
            }}
            loading={proceedLoading}
            disabled={phoneNumber.length < 10}
          />
        </BottomActionCard>
      </View>
      <SnackBar
        setSnackbarVisible={setSnackbarVisible}
        snackbarVisible={snackbarVisible}
        snackbarMessage={snackbarMessage}
      />
    </MainView>
  );
};

export default WithdrawalChannel;

const styles = StyleSheet.create({
  paymentOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  paymentLeft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  paymentOptionsCard: {
    borderRadius: 20,
    borderColor: COLORS.TERTIARY,
    justifyContent: "center",
  },
  paymentRight: {
    marginRight: -25,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.SECONDARY,
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.TERTIARY,
    marginTop: 20,
    height: 65,
  },
});
