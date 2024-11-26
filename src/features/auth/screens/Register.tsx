import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import MainView from "@shared/components/elements/Views/MainView";
import TextElement from "@shared/components/elements/Texts/TextElement";
import FormHeader from "../components/FormHeader";
import InputElement from "@shared/components/elements/Inputs/InputElement";
import ButtonElement from "@shared/components/elements/Buttons/ButtonElement";

const Register = () => {
  return (
    <MainView style={styles.container}>
      <View style={styles.formHeaderView}>
        <FormHeader
          title="Create Account"
          description="Fill below the information below to create an account"
        />
      </View>
      <View style={styles.formBodyView}>
        <InputElement
          placeholder="Esther Howard"
          label="Name"
          keyboardType="default"
        />
        <InputElement
          placeholder="example@gmail.com"
          keyboardType="email-address"
          label="Email"
        />
        <InputElement
          placeholder="********"
          label="Password"
          secureTextEntry={true}
          keyboardType="default"
          rightIcon="eye"
        />
        <ButtonElement title="Create Account" />
      </View>
    </MainView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formHeaderView: {
    gap: 10,
  },
  formBodyView: {
    width: "100%",
    gap: 20,
  },
});
