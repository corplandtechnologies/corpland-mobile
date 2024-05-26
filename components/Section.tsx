import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC, ReactNode } from "react";
import { COLORS } from "../utils/color";

interface SectionProps {
  headerText: string;
  children: ReactNode;
  onPress?: () => void;
  routeName?: string | undefined;
}
const Section: FC<SectionProps> = ({
  headerText,
  children,
  onPress,
  routeName,
}) => {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>{headerText}</Text>
        <TouchableOpacity onPress={() => onPress && onPress(routeName)}>
          <Text style={styles.headerOptions}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.childrenView}>{children}</View>
    </View>
  );
};

export default Section;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 18,
    color: COLORS.PRIMARY,
    fontFamily: "InterBold",
  },
  childrenView: {
    marginTop: 10,
    gap: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerOptions: {
    fontFamily: "InterRegular",
    color: COLORS.GRAY,
  },
});
