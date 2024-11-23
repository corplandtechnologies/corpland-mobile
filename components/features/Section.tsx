import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC, ReactNode } from "react";
import { COLORS } from "../../utils/color";

interface SectionProps {
  headerText: string;
  children: ReactNode;
  onPress?: () => void;
  routeName?: string | undefined;
  limited?: boolean;
}
const Section: FC<SectionProps> = ({
  headerText,
  children,
  onPress,
  routeName,
  limited,
}) => {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>{headerText}</Text>
        {!limited && (
          <TouchableOpacity onPress={() => onPress && onPress(routeName)}>
            <Text style={styles.headerOptions}>See All</Text>
          </TouchableOpacity>
        )}
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
    fontFamily: "PoppinsSemiBold",
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
    fontFamily: "PoppinsRegular",
    color: COLORS.GRAY,
  },
});
