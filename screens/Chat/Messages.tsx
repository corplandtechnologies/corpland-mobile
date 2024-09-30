import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import MainView from "../../components/elements/Views/MainView";
import { COLORS } from "../../utils/color";
import FormInput from "../../components/ui/FormInput";
import ChatPreview from "./components/ChatPreview";
import { StatusBar } from "expo-status-bar";
import { useRoute } from "@react-navigation/native";

const Messages = () => {
  const route = useRoute();
  const [search, setSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  return (
    <MainView style={styles.main}>
      {route.name === "Messages" && <StatusBar style="light" />}
      <View style={styles.topView}>
        <FormInput
          style={{
            borderColor: "none",
          }}
          icon="search"
          placeholder="Who are you looking for?"
          isButtonedIcon="options"
          onChangeText={setSearch}
          loading={searchLoading}
          onPress={() => handleSearch(setSearchLoading)}
        />
      </View>
      <View style={styles.bottomView}>
        <ScrollView
          contentContainerStyle={{ gap: 10 }}
          showsVerticalScrollIndicator={false}
        >
          <ChatPreview />
          <ChatPreview />
          <ChatPreview />
          <ChatPreview />
          <ChatPreview />
          <ChatPreview />
          <ChatPreview />
        </ScrollView>
      </View>
    </MainView>
  );
};

export default Messages;

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.PRIMARY,
  },
  topView: {
    flex: 1,
    padding: 20,
  },
  bottomView: {
    flex: 5,
    backgroundColor: COLORS.SECONDARY,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    gap: 10,
  },
});
