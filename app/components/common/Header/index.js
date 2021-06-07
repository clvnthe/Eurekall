import { useTheme } from "@react-navigation/native";
import React from "react";
import { Appbar } from "react-native-paper";

const HeaderComponent = ({ navigation, title, statusBarHeight }) => {
  const theme = useTheme();
  const openMenu = () => {
    navigation.openDrawer();
  };
  return (
    <Appbar.Header
      //style={{ backgroundColor: theme.colors.primary }}
      statusBarHeight={statusBarHeight}
      style={{ elevation: 4 }}
    >
      <Appbar.Action
        icon="menu"
        onPress={openMenu}
        color={theme.dark ? theme.colors.primary : theme.colors.onPrimary}
      />
      <Appbar.Content
        title={title}
        color={theme.dark ? theme.colors.primary : theme.colors.onPrimary}
      />
    </Appbar.Header>
  );
};

export default HeaderComponent;
