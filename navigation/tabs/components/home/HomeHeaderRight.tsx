import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Icon, withBadge } from "react-native-elements";
import { useApp } from "../../../../context/AppContext";
import { COLORS } from "../../../../utils/color";

const HomeHeaderRight = ({ navigation }: { navigation: any }) => {
  const { user, unreadNotifications, updateUnreadNotificationCount } = useApp();

  useEffect(() => {
    if (user) {
      updateUnreadNotificationCount(user._id);
    }
  }, [user, updateUnreadNotificationCount]);

  const BadgedIcon = withBadge(unreadNotifications)(Icon);

  return (
    <TouchableOpacity
      style={{
        paddingRight: 10,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
      }}
      onPress={() => navigation.navigate("Notifications")}
    >
      <BadgedIcon
        style={{
          backgroundColor: COLORS.GRAY_LIGHT,
          padding: 5,
          borderRadius: 5,
        }}
        name="notifications"
        type="ionicon"
        size={25}
        color={COLORS.PRIMARY}
        status="primary"
      />
    </TouchableOpacity>
  );
};

export default HomeHeaderRight;
