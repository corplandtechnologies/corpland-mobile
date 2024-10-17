import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from "react-native";

interface Tab {
  id: string;
  label: string;
  data: any[];
}

interface TabViewProps {
  tabs: Tab[];
  renderItem: (item: any) => React.ReactNode;
  containerStyle?: ViewStyle;
  activeTabStyle?: ViewStyle;
  inactiveTabStyle?: ViewStyle;
  activeTextColor?: string;
  inactiveTextColor?: string;
  scrollable?: boolean;
  contentContainerStyle?: ViewStyle;
}

const TabView: React.FC<TabViewProps> = ({
  tabs,
  renderItem,
  containerStyle,
  activeTabStyle,
  inactiveTabStyle,
  activeTextColor = "#FFFFFF",
  inactiveTextColor = "#007AFF",
  scrollable = true,
  contentContainerStyle,
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  const defaultActiveTabStyle = {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  };

  const defaultInactiveTabStyle = {
    backgroundColor: "#FFFFFF",
    borderColor: "#007AFF",
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setActiveTab(tab.id)}
            style={[
              styles.tab,
              activeTab === tab.id
                ? { ...defaultActiveTabStyle, ...activeTabStyle }
                : { ...defaultInactiveTabStyle, ...inactiveTabStyle },
            ]}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === tab.id ? activeTextColor : inactiveTextColor,
                },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {scrollable ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.contentContainer,
            contentContainerStyle,
          ]}
        >
          {tabs
            .find((tab) => tab.id === activeTab)
            ?.data.map((item, index) => (
              <View key={index}>{renderItem(item)}</View>
            ))}
        </ScrollView>
      ) : (
        <View style={[styles.contentContainer, contentContainerStyle]}>
          {tabs
            .find((tab) => tab.id === activeTab)
            ?.data.map((item, index) => (
              <View key={index}>{renderItem(item)}</View>
            ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 10,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    minWidth: 80,
    alignItems: "center",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
  },
  contentContainer: {
    padding: 10,
    gap: 10,
  },
});

export default TabView;
