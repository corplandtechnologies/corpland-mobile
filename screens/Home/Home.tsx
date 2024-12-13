import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ViewElement from "../../components/common/View/ViewElement";
import TextElement from "../../components/common/Text/TextElement";
import IconElement from "../../components/common/Icon/IconElement";
import { Badge } from "@rneui/themed";
import Header from "../../components/ui/Header/Header";
import Search from "../../components/common/Search/Search";
import { useTheme } from "../../context/ThemeContext";
import Banner from "./components/Banner/Banner";

const Home = () => {
  const { theme } = useTheme();
  return (
    <ViewElement safeAreaView scrollView style={styles.container}>
      <Header
        leftElement={
          <ViewElement style={styles.locationContainer}>
            <TextElement>Location</TextElement>
            <ViewElement style={styles.locationContainerBottom}>
              <IconElement name="location" size={18} />
              <TextElement fontFamily="poppinsMedium">
                Ayeduase, Ghana
              </TextElement>
              <IconElement name="chevron-down" size={18} />
            </ViewElement>
          </ViewElement>
        }
        rightElement={
          <ViewElement
            style={[
              styles.headerContainerRight,
              { backgroundColor: theme.TERTIARY_LIGHT },
            ]}
          >
            <IconElement name="notifications" size={24} />
            <Badge
              status="error"
              value="0"
              containerStyle={{ position: "absolute", top: -4, right: -1 }}
            />
          </ViewElement>
        }
      />
      <ViewElement style={[{ ...styles.paddingContainer }]}>
        <Search
          placeholder="What are you looking for..."
          onChangeText={() => {}}
        />
      </ViewElement>
      <ViewElement style={styles.bannerContainer}>
        <Banner />
      </ViewElement>
    </ViewElement>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {},
  locationContainerBottom: {
    flexDirection: "row",
    gap: 5,
  },
  locationContainer: {
    gap: 2.5,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
  },
  paddingContainer: {
    padding: 10,
  },
  headerContainerRight: {
    padding: 5,
    borderRadius: 5,
  },
  bannerContainer: {
    padding: 10,
  },
});
