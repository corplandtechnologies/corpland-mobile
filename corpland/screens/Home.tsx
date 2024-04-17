import ScreenContextWrapper from "../components/ScreenContextWrapper";
import Request from "../components/Request";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

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
  return (
    <ScreenContextWrapper>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {posts.map((post, index) => (
          <Request
            key={index}
            post={post}
          />
        ))}
      </ScrollView>
    </ScreenContextWrapper>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default Home;
