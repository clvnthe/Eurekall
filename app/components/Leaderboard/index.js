import { useTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Avatar,
  Portal,
  Modal,
  Subheading,
  Surface,
  Title,
} from "react-native-paper";
import styles from "./styles";
import firebase from "firebase";
import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  ShineOverlay,
} from "rn-placeholder";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const firebaseConfig = {
  apiKey: "AIzaSyAq9csfcFvRvMPS-kEjBN1IJ5iL0Sfvn2w",
  authDomain: "eurekall.firebaseapp.com",
  projectId: "eurekall",
  storageBucket: "eurekall.appspot.com",
  messagingSenderId: "132679568347",
  appId: "1:132679568347:web:5fb1b1b852eefc092cf5fe",
  measurementId: "G-H1N45TFCSX",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
const firestore = firebase.firestore();
const fireBucket = firebase.storage();

function LeaderboardComponent(props) {
  const theme = useTheme();
  const defaultImage =
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fe58bbba-fabe-4ca9-a574-04bb6f4d453d/d4j47k3-8983fc90-50e8-47ee-a08c-e7a31e7401ab.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ZlNThiYmJhLWZhYmUtNGNhOS1hNTc0LTA0YmI2ZjRkNDUzZFwvZDRqNDdrMy04OTgzZmM5MC01MGU4LTQ3ZWUtYTA4Yy1lN2EzMWU3NDAxYWIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.YbcvA7bF9G7E5gxhZuGcWw5bXoArcb_T-4z_BrmXyQ8";
  const [image, setImage] = useState(defaultImage);
  const [leaderboardUsers, setLeaderboardUsers] = useState([]);
  const [tempLeaderboardUsers, setTempLeaderboardUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshBoolean, setRefreshBoolean] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const onRefresh = () => {
    setRefreshing(true);
    setIsLoading(true);
    setRefreshBoolean(() => !refreshBoolean);
  };

  const loadDetails = (userData, idCounter) => {
    let i = 1;
    fireBucket
      .ref()
      .child("images/" + userData["email"])
      .getDownloadURL()
      .then((url) => {
        const userDataObject = {
          id: String(idCounter),
          username: userData["preferred_username"],
          title: determineTitle(Math.floor(userData["exp"] / 500) + 1),
          description: userData["description"],
          level: String(Math.floor(userData["exp"] / 500) + 1),
          profilePic: url,
        };
        tempLeaderboardUsers.push(userDataObject);
        tempLeaderboardUsers.sort((a, b) => parseInt(a.id) - parseInt(b.id));
      })
      .catch((error) => {
        const userDataObject = {
          id: String(idCounter),
          username: userData["preferred_username"],
          title: determineTitle(Math.floor(userData["exp"] / 500) + 1),
          description: userData["description"],
          level: String(Math.floor(userData["exp"] / 500) + 1),
          profilePic: defaultImage,
        };
        tempLeaderboardUsers.push(userDataObject);
        tempLeaderboardUsers.sort((a, b) => parseInt(a.id) - parseInt(b.id));
      });
  };

  useEffect(() => {
    setTimeout(async () => {
      try {
        const firebaseUserRef = firestore.collection("users");
        const getLeaderboardData = await firebaseUserRef
          .orderBy("exp", "desc")
          .limit(8)
          .get();
        const leaderboardData = getLeaderboardData["docs"];
        let i = 1;
        leaderboardData.forEach((getUserData) => {
          const userData = getUserData.data();
          loadDetails(userData, i);
          i++;
        });
        setLeaderboardUsers(tempLeaderboardUsers);
        setTempLeaderboardUsers([]);
      } catch (error) {
        console.log("leaderboard loading error");
        console.log(error);
      }
    }, 0);
    setTimeout(() => {
      setIsLoading(false);
      setRefreshing(false);
    }, 1000);
  }, [refreshBoolean]);

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

  const [visible, setVisible] = React.useState(false);
  const [currentUserProfile, setCurrentUserProfile] = React.useState({
    id: null,
    username: null,
    title: null,
    level: null,
    profilePic: null,
  });
  const showModal = (item) => {
    setVisible(true);
    setCurrentUserProfile(item);
  };
  const hideModal = () => setVisible(false);

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

  const determineTitle = (userLvl) => {
    if (userLvl >= 30) {
      return "Legend";
    } else if (userLvl >= 25) {
      return "Grandmaster";
    } else if (userLvl >= 20) {
      return "Master";
    } else if (userLvl >= 15) {
      return "Expert";
    } else if (userLvl >= 10) {
      return "Graduate";
    } else if (userLvl >= 5) {
      return "Novice";
    } else {
      return "Beginner";
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
      <TouchableOpacity onPress={() => showModal(item)}>
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
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={[
            {
              backgroundColor: theme.dark
                ? theme.colors.border
                : theme.colors.background,
            },
            styles.modalContainer,
          ]}
        >
          <ScrollView
            contentContainerStyle={[
              {
                backgroundColor: theme.dark
                  ? theme.colors.border
                  : theme.colors.background,
              },
              styles.modalInnerScrollViewContainer,
            ]}
          >
            <Title
              style={{
                fontFamily: "PoppinsBold",
                color: determineRankTextColour(currentUserProfile.id),
              }}
            >
              #{currentUserProfile.id}
            </Title>
            <Avatar.Image
              size={100}
              source={{ uri: currentUserProfile.profilePic }}
            ></Avatar.Image>
            <Title
              style={{
                fontFamily: "PoppinsBold",
                color: theme.colors.text,
                marginBottom: -8,
              }}
            >
              {currentUserProfile.username}
            </Title>
            <Subheading
              style={{ fontFamily: "PoppinsMedium", color: theme.colors.text }}
            >
              {currentUserProfile.title}
            </Subheading>
            <Text
              style={{
                fontFamily: "PoppinsRegular",
                color: theme.colors.text,
                textAlign: "center",
              }}
            >
              {currentUserProfile.description}
            </Text>
            <View style={styles.profileLvl}>
              <LinearGradient
                colors={determineLvlCircleOutline(currentUserProfile.level)}
                style={styles.profileLevelCircleOutline}
              >
                <View
                  style={[
                    styles.profileLevelCircleInner,
                    {
                      backgroundColor: theme.dark
                        ? theme.colors.border
                        : theme.colors.background,
                    },
                  ]}
                >
                  <Text
                    style={{
                      fontFamily: "PoppinsBold",
                      fontSize: 30,
                      color: theme.colors.text,
                    }}
                  >
                    {currentUserProfile.level}
                  </Text>
                </View>
              </LinearGradient>
            </View>
          </ScrollView>
        </Modal>
      </Portal>
      {isLoading ? ( //SKELETON PLACEHOLDER UI
        <View style={{ flex: 1 }}>
          <Placeholder
            Animation={ShineOverlay}
            style={{
              alignSelf: "center",
              overflow: "hidden",
            }}
          >
            <Surface
              style={[
                styles.userContainer,
                {
                  backgroundColor: !theme.dark
                    ? "#F0F0F0"
                    : theme.colors.border,
                  justifyContent: "center",
                },
              ]}
            >
              <View style={{ flexDirection: "row" }}>
                <PlaceholderMedia
                  style={{
                    borderRadius: 40,
                    height: 80,
                    width: 80,
                    marginRight: 10,
                    backgroundColor: "#CDCDCD",
                  }}
                />
                <View
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <PlaceholderLine
                    style={{
                      backgroundColor: "#CDCDCD",
                      width: responsiveWidth(40),
                      height: responsiveHeight(3),
                    }}
                  />
                  <PlaceholderLine
                    style={{
                      backgroundColor: "#CDCDCD",
                      width: responsiveWidth(30),
                      height: responsiveHeight(3),
                    }}
                  />
                </View>
              </View>
            </Surface>
            <Surface
              style={[
                styles.userContainer,
                {
                  backgroundColor: !theme.dark
                    ? "#F0F0F0"
                    : theme.colors.border,
                  justifyContent: "center",
                },
              ]}
            >
              <View style={{ flexDirection: "row" }}>
                <PlaceholderMedia
                  style={{
                    borderRadius: 40,
                    height: 80,
                    width: 80,
                    marginRight: 10,
                    backgroundColor: "#CDCDCD",
                  }}
                />
                <View
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <PlaceholderLine
                    style={{
                      backgroundColor: "#CDCDCD",
                      width: responsiveWidth(40),
                      height: responsiveHeight(3),
                    }}
                  />
                  <PlaceholderLine
                    style={{
                      backgroundColor: "#CDCDCD",
                      width: responsiveWidth(30),
                      height: responsiveHeight(3),
                    }}
                  />
                </View>
              </View>
            </Surface>
            <Surface
              style={[
                styles.userContainer,
                {
                  backgroundColor: !theme.dark
                    ? "#F0F0F0"
                    : theme.colors.border,
                  justifyContent: "center",
                },
              ]}
            >
              <View style={{ flexDirection: "row" }}>
                <PlaceholderMedia
                  style={{
                    borderRadius: 40,
                    height: 80,
                    width: 80,
                    marginRight: 10,
                    backgroundColor: "#CDCDCD",
                  }}
                />
                <View
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <PlaceholderLine
                    style={{
                      backgroundColor: "#CDCDCD",
                      width: responsiveWidth(40),
                      height: responsiveHeight(3),
                    }}
                  />
                  <PlaceholderLine
                    style={{
                      backgroundColor: "#CDCDCD",
                      width: responsiveWidth(30),
                      height: responsiveHeight(3),
                    }}
                  />
                </View>
              </View>
            </Surface>
            <Surface
              style={[
                styles.userContainer,
                {
                  backgroundColor: !theme.dark
                    ? "#F0F0F0"
                    : theme.colors.border,
                  justifyContent: "center",
                },
              ]}
            >
              <View style={{ flexDirection: "row" }}>
                <PlaceholderMedia
                  style={{
                    borderRadius: 40,
                    height: 80,
                    width: 80,
                    marginRight: 10,
                    backgroundColor: "#CDCDCD",
                  }}
                />
                <View
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <PlaceholderLine
                    style={{
                      backgroundColor: "#CDCDCD",
                      width: responsiveWidth(40),
                      height: responsiveHeight(3),
                    }}
                  />
                  <PlaceholderLine
                    style={{
                      backgroundColor: "#CDCDCD",
                      width: responsiveWidth(30),
                      height: responsiveHeight(3),
                    }}
                  />
                </View>
              </View>
            </Surface>
            <Surface
              style={[
                styles.userContainer,
                {
                  backgroundColor: !theme.dark
                    ? "#F0F0F0"
                    : theme.colors.border,
                  justifyContent: "center",
                },
              ]}
            >
              <View style={{ flexDirection: "row" }}>
                <PlaceholderMedia
                  style={{
                    borderRadius: 40,
                    height: 80,
                    width: 80,
                    marginRight: 10,
                    backgroundColor: "#CDCDCD",
                  }}
                />
                <View
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <PlaceholderLine
                    style={{
                      backgroundColor: "#CDCDCD",
                      width: responsiveWidth(40),
                      height: responsiveHeight(3),
                    }}
                  />
                  <PlaceholderLine
                    style={{
                      backgroundColor: "#CDCDCD",
                      width: responsiveWidth(30),
                      height: responsiveHeight(3),
                    }}
                  />
                </View>
              </View>
            </Surface>
            <Surface
              style={[
                styles.userContainer,
                {
                  backgroundColor: !theme.dark
                    ? "#F0F0F0"
                    : theme.colors.border,
                  justifyContent: "center",
                },
              ]}
            >
              <View style={{ flexDirection: "row" }}>
                <PlaceholderMedia
                  style={{
                    borderRadius: 40,
                    height: 80,
                    width: 80,
                    marginRight: 10,
                    backgroundColor: "#CDCDCD",
                  }}
                />
                <View
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <PlaceholderLine
                    style={{
                      backgroundColor: "#CDCDCD",
                      width: responsiveWidth(40),
                      height: responsiveHeight(3),
                    }}
                  />
                  <PlaceholderLine
                    style={{
                      backgroundColor: "#CDCDCD",
                      width: responsiveWidth(30),
                      height: responsiveHeight(3),
                    }}
                  />
                </View>
              </View>
            </Surface>
          </Placeholder>
        </View>
      ) : (
        <FlatList
          data={leaderboardUsers}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View style={styles.footer} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}

export default LeaderboardComponent;
