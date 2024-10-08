import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MainView from "../components/elements/Views/MainView";
import TextElement from "../components/elements/Texts/TextElement";

const PrivacyPolicy = () => {
  return (
    <MainView style={{ padding: 10 }}>
      <View>
        <TextElement fontSize={18}>Cancellation Policy</TextElement>
        <TextElement fontFamily="PoppinsRegular">
          Last updated: June 30, 2024
          <TextElement>
            {" "}
            This Privacy Policy describes Our policies and procedures on the
            collection, use and disclosure of Your information when You use the
            Service and tells You about Your privacy rights and how the law
            protects You.
          </TextElement>
          We use Your Personal data to provide and improve the Service. By using
          the Service, You agree to the collection and use of information in
          accordance with this Privacy Policy. This Privacy Policy has been
          created with the help of the Privacy Policy Generator.
        </TextElement>
      </View>
    </MainView>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({});
