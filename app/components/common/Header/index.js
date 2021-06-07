import { useTheme } from "@react-navigation/native";
import React from "react";
import { Image } from "react-native";
import { Appbar } from "react-native-paper";
import { HOME_MAIN } from "../../../constants/routeNames";

const HeaderComponent = ({ scene, previous, navigation, statusBarHeight }) => {
  const theme = useTheme();
  const openMenu = () => {
    navigation.openDrawer();
  };

  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <Appbar.Header
      //style={{ backgroundColor: theme.colors.primary }}
      statusBarHeight={statusBarHeight}
      style={{ elevation: 4 }}
    >
      {previous ? (
        <Appbar.BackAction
          onPress={() => navigation.pop()}
          color={theme.dark ? theme.colors.primary : theme.colors.onPrimary}
        />
      ) : (
        <Appbar.Action
          icon="menu"
          onPress={openMenu}
          color={theme.dark ? theme.colors.primary : theme.colors.onPrimary}
        />
      )}
      <Appbar.Content
        title={title}
        color={theme.dark ? theme.colors.primary : theme.colors.onPrimary}
      />
      <Image
        resizeMode="contain"
        style={{ width: 150, height: 80, left: 20 }}
        source={
          theme.dark
            ? require("../../../../assets/images/cover_dark.png")
            : require("../../../../assets/images/cover.png")
        }
      ></Image>
    </Appbar.Header>
  );
};

export default HeaderComponent;
