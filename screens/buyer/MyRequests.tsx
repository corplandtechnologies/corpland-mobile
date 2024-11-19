import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { COLORS } from "../../utils/color";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import AsyncStorage from "@react-native-async-storage/async-storage";
import RequestCard from "../../components/RequestCard";
import { useApp } from "../../context/AppContext";
import { getRequestsByUserId } from "../../api/api";

const MyRequests = () => {
  const [userRequests, setUserRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const navigation: any = useNavigation();
  const { user } = useApp();

  console.log("userRequests", user?._id);

  useFocusEffect(
    useCallback(() => {
      const getUserRequests = async () => {
        setIsLoading(true); // Set loading to true before fetching data
        try {
          const response = await getRequestsByUserId(user._id);

          setUserRequests(response?.data);
        } catch (error) {
        } finally {
          setIsLoading(false); // Set loading to false after fetching data
        }
      };

      getUserRequests();
    }, [])
  );

  return (
    <View style={styles.main}>
      {isLoading ? (
        <ActivityIndicator size={50} color={COLORS.PRIMARY} />
      ) : userRequests.length === 0 ? (
        <View style={styles.centeredContainer}>
          <Text style={styles.noRequestsText}>
            You don't have any listed requests,
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("TabNavigator", { screen: "Add" })
            }
          >
            <Text style={styles.tapHereText}>Tap Here to Make one</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ gap: 10 }}>
          {userRequests?.map((request) => (
            <RequestCard key={request._id} request={request} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default MyRequests;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.SECONDARY,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noRequestsText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  tapHereText: {
    fontSize: 16,
    color: COLORS.PRIMARY,
    textDecorationLine: "underline",
  },
});
