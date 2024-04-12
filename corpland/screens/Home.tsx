import { View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ScreenContextWrapper from "../components/ScreenContextWrapper";
import Request from "../components/Request";
import { ScrollView } from "react-native-gesture-handler";

const Home = () => {
  return (
    <ScreenContextWrapper>
      <ScrollView className="p-5">
        <Request />
        <Request />
        <Request />
        <Request />
        <Request />
        <Request />
        <Request />
      </ScrollView>
    </ScreenContextWrapper>
  );
};

export default Home;
