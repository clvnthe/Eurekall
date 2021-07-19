import { useTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { Avatar, Subheading, Surface, Title } from "react-native-paper";
import styles from "./styles";

function LeaderboardComponent(props) {
  const theme = useTheme();
  const users = [
    {
      id: "1",
      username: "user1",
      title: "title1",
      level: "30",
      profilePic:
        "https://images.generated.photos/3OZMd8KCcwZcD6Q8pVZ31gFGSHMI-T9BcjwpTn-XnGA/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxMDcwNDcuanBn.jpg",
    },
    {
      id: "2",
      username: "user2",
      title: "title2",
      level: "27",
      profilePic:
        "https://images.generated.photos/tvC9rHoe-N2I7WOIjaIrNVEWI8BPKHGsp4-wgh3SIh8/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA0MzIwMDYuanBn.jpg",
    },
    {
      id: "3",
      username: "user3",
      title: "title3",
      level: "23",
      profilePic:
        "https://images.generated.photos/_WndN2yOF4GbFldKwNJhFa5Xqnzd1rPOJ4xuRoi6_f8/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAwNDU5NTQuanBn.jpg",
    },
    {
      id: "4",
      username: "user4",
      title: "title4",
      level: "18",
      profilePic:
        "https://images.generated.photos/vEFW1OwIq1dhhRnjp2JZ5RjmJwpr-yutBogdlDq4ghM/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA2NjI4OTYuanBn.jpg",
    },
    {
      id: "5",
      username: "user5",
      title: "title5",
      level: "14",
      profilePic:
        "https://images.generated.photos/xiIETkMgtsA_tdtXdTm4eyHaFPgRFnOUPAsSyMlnFgw/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA1NTI3MTIuanBn.jpg",
    },
    {
      id: "6",
      username: "user6",
      title: "title6",
      level: "6",
      profilePic:
        "https://images.generated.photos/J4xISMjXl1Qz-xMBDsEuZXqM4sWZ69z9GQ5bhO5m520/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNTYzNzEuanBn.jpg",
    },
    {
      id: "7",
      username: "user7",
      title: "title7",
      level: "4",
      profilePic:
        "https://images.generated.photos/ynJ_cfnv9cWqngt-aLSnKVYpMbLzOnwe92zwVp2CCME/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyMTA0NDkuanBn.jpg",
    },
    {
      id: "8",
      username: "user8",
      title: "title8",
      level: "3",
      profilePic:
        "https://images.generated.photos/KPuMJBHG9UESbaMbjs-ai-NMbJkbYlZEWXHw3SCGX0c/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA4ODEzOTIuanBn.jpg",
    },
  ];

  const determineLvlCircleOutline = (userLvl) => {
    if (userLvl >= 30) {
      return ["#ff512f", "#dd2476"];
    } else if (userLvl >= 25) {
      return ["#FDC830", "#F37335"];
    } else if (userLvl >= 20) {
      return ["#00B4DB", "#0083B0"];
    } else if (userLvl >= 15) {
      return ["#3494E6", "#EC6EAD"];
    } else if (userLvl >= 10) {
      return ["#3E5151", "#DECBA4"];
    } else if (userLvl >= 5) {
      return ["#D3CCE3", "#E9E4F0"];
    } else {
      return ["#DBE6F6", "#DBE6F6"];
    }
  };

  const determineRankTextColour = (rank) => {
    if (rank === "1") {
      return "#C9B037";
    } else if (rank === "2") {
      return "#aaa9ad";
    } else if (rank === "3") {
      return "#CD7F32";
    } else {
      return theme.colors.text;
    }
  };

  const [loaded] = useFonts({
    MontserratLight: require("../../../assets/fonts/Montserrat-Light.ttf"),
    MontserratBold: require("../../../assets/fonts/Montserrat-Bold.ttf"),
    PoppinsMedium: require("../../../assets/fonts/Poppins-Medium.ttf"),
    PoppinsBold: require("../../../assets/fonts/Poppins-Bold.ttf"),
    PoppinsLight: require("../../../assets/fonts/Poppins-Light.ttf"),
    PoppinsThin: require("../../../assets/fonts/Poppins-Thin.ttf"),
    PoppinsRegular: require("../../../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const renderItem = ({ item }) => {
    return (
      <Surface
        style={[
          styles.userContainer,
          {
            backgroundColor: !theme.dark ? "#F0F0F0" : theme.colors.border,
          },
        ]}
      >
        <View style={styles.innerContainer}>
          <View style={styles.rankTextContainer}>
            <Text
              style={{
                fontFamily: "PoppinsMedium",
                color: determineRankTextColour(item.id),
              }}
            >
              #{item.id}
            </Text>
          </View>
          <View style={styles.innerPPandTextContainer}>
            <Avatar.Image
              size={80}
              source={{
                uri: item.profilePic,
              }}
            />
            <View style={styles.innerTextContainer}>
              <Title
                style={[
                  styles.usernameText,
                  { fontFamily: "PoppinsBold", color: theme.colors.text },
                ]}
              >
                {item.username}
              </Title>
              <Subheading style={{ fontFamily: "PoppinsMedium" }}>
                {item.title}
              </Subheading>
            </View>
          </View>
          <View style={styles.levelContainer}>
            <LinearGradient
              colors={determineLvlCircleOutline(item.level)}
              style={styles.levelCircleOutline}
            >
              <View
                style={[
                  styles.levelCircleInner,
                  {
                    backgroundColor: theme.dark
                      ? theme.colors.border
                      : "#F0F0F0",
                  },
                ]}
              >
                <Text
                  style={{
                    fontFamily: "PoppinsBold",
                    color: theme.colors.text,
                  }}
                >
                  {item.level}
                </Text>
              </View>
            </LinearGradient>
          </View>
        </View>
      </Surface>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListFooterComponent={<View style={styles.footer} />}
      />
    </View>
  );
}

export default LeaderboardComponent;
