import ScreenContextWrapper from "../components/ScreenContextWrapper";
import Request from "../components/Request";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { getAds, getRequests } from "../api/api";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { COLORS } from "../utils/color";

const Home = () => {
  const posts = [
    {
      title: "We are looking for 45 Freelancers",
      description:
        "I will provide a detailed description of the project and what is needed from freelancers in this section. More of the details can be found on our website www.website.com at the 'Projects' tab.",
      image: require("../assets/Designer.jpeg"),
      postedTime: "3 minutes ago",
    },
  ];
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  console.log(requests);

  useFocusEffect(
    React.useCallback(() => {
      const getPosts = async () => {
        setLoading(true);
        try {
          const requestsResponse = await getRequests();
          const adsResponse = await getAds();
          setRequests([...requestsResponse?.data, ...adsResponse?.data]);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      };
      getPosts();
    }, [])
  );

  return (
    <ScreenContextWrapper>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {loading ? (
          <>
            <View
              style={{
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <ActivityIndicator
                size={50}
                color={COLORS.PRIMARY}
              />
            </View>
          </>
        ) : (
          <>
            {requests?.map((post, index) => (
              <Request
                key={index}
                post={post}
              />
            ))}
          </>
        )}
      </ScrollView>
    </ScreenContextWrapper>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 10,
  },
});

export default Home;
