import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
  useTheme,
  Appbar,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { AuthContext } from "../../context/Provider";
import Auth from "@aws-amplify/auth";
import colors from "../../../assets/theme/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  PROFILE_NAVIGATOR,
  SETTINGS_NAVIGATOR,
  TAB_NAVIGATOR,
} from "../../constants/routeNames";

function DrawerContent(props) {
  const { logOut, toggleTheme } = React.useContext(AuthContext);
  const [userInfo, setUserInfo] = React.useState([]);

  useEffect(() => {
    setTimeout(async () => {
      let user;
      user = null;
      try {
        user = await AsyncStorage.getItem("userInfo").then((req) =>
          JSON.parse(req)
        );
      } catch (err) {
        console.log(err);
      }
      setUserInfo(user);
      console.log(userInfo);
    }, 0);
  }, []);

  async function signOut() {
    try {
      await Auth.signOut();
      console.log("successful logging out");
      logOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        elevation: 16,
        backgroundColor: theme.dark ? "#363636" : theme.colors.background,
      }}
    >
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fe58bbba-fabe-4ca9-a574-04bb6f4d453d/d4j47k3-8983fc90-50e8-47ee-a08c-e7a31e7401ab.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ZlNThiYmJhLWZhYmUtNGNhOS1hNTc0LTA0YmI2ZjRkNDUzZFwvZDRqNDdrMy04OTgzZmM5MC01MGU4LTQ3ZWUtYTA4Yy1lN2EzMWU3NDAxYWIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.YbcvA7bF9G7E5gxhZuGcWw5bXoArcb_T-4z_BrmXyQ8",
                }}
                size={75}
              ></Avatar.Image>
            </View>
            <Drawer.Section style={styles.drawerSection}>
              <View style={{ flexDirection: "column" }}>
                <View style={styles.section}>
                  <Title
                    style={[
                      styles.title,
                      {
                        color: theme.dark
                          ? theme.colors.primary
                          : theme.colors.text,
                      },
                    ]}
                  >
                    {userInfo[1]}
                  </Title>
                </View>
                <View style={styles.section}>
                  <Caption style={styles.caption}>@{userInfo[2]}</Caption>
                </View>
              </View>
            </Drawer.Section>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate(TAB_NAVIGATOR);
              }}
            ></DrawerItem>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate(PROFILE_NAVIGATOR);
              }}
            ></DrawerItem>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="cog-outline" color={color} size={size} />
              )}
              label="Settings"
              onPress={() => {
                props.navigation.navigate(SETTINGS_NAVIGATOR);
              }}
            ></DrawerItem>
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple onPress={() => toggleTheme()}>
              <View style={styles.preference}>
                <Text style={{ alignSelf: "center" }}>
                  {theme.dark ? "Dark Theme" : "Light Theme"}
                </Text>
                <View style={{ flexDirection: "row" }} pointerEvents="none">
                  <Avatar.Icon
                    backgroundColor={Appbar.color}
                    color={theme.dark ? colors.white : "#ff8c00"}
                    size={35}
                    icon={theme.dark ? "brightness-3" : "weather-sunny"}
                  />
                  <Switch
                    color={theme.colors.secondary}
                    value={theme.dark}
                    onValueChange={() => toggleTheme()}
                  />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => signOut()}
        ></DrawerItem>
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 24,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
    paddingHorizontal: 16,
  },
});
export default DrawerContent;
