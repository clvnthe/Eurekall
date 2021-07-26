import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import {
  Avatar,
  FAB,
  Modal,
  Portal,
  useTheme,
  Title,
  Searchbar,
} from "react-native-paper";
import FlashCard from "../common/FlashCard";
import FlashCardForm from "../common/flashcardForm";
import { useDispatch, useSelector } from "react-redux";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { useIsFocused } from "@react-navigation/core";
import * as Decks from "../../../store/slices/deckSlice";
import { useFonts } from "expo-font";
import firebase from "firebase";
import { ScaledSheet } from "react-native-size-matters";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { userStatsLocal } from "../../../assets/data/userStatsLocal";
import { objectivesData } from "../../../assets/data/objectivesData";

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
const fireauth = firebase.auth();

function ViewingComponent({ route }) {
  const isFocused = useIsFocused();
  const index = route.params.paramIndex;

  const decks = useSelector(Decks.getDecks);
  const [filteredCards, setFilteredCards] = useState([]);
  const [empty, setEmpty] = useState(!decks[index].cards.length);

  const [searchQuery, setSearchQuery] = React.useState("");
  const [keyboardIsActive, setKeyboardIsActive] = useState(false);
  const onChangeSearch = (query) => setSearchQuery(query);
  const windowHeight = useWindowDimensions().height;

  const updateObjectiveStatusLocally = () => {
    const userStats = userStatsLocal[0];
    const userObjectives = objectivesData;
    if (
      userStats["decksCreated"] >= 1 &&
      userObjectives[0]["collected"] === false
    ) {
      userObjectives[0]["completed"] = true;
    }
    if (
      userStats["cardsCreated"] >= 1 &&
      userObjectives[1]["collected"] === false
    ) {
      userObjectives[1]["completed"] = true;
    }
    if (
      userStats["cardsDeleted"] >= 1 &&
      userObjectives[2]["collected"] === false
    ) {
      userObjectives[2]["completed"] = true;
    }
    if (
      userStats["box5Cards"] >= 5 &&
      userObjectives[3]["collected"] === false
    ) {
      userObjectives[3]["completed"] = true;
    }
  };

  const theme = useTheme();

  const dispatch = useDispatch();

  useEffect(() => {
    setFilteredCards(
      decks[index].cards.filter(
        (card) =>
          card.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          card.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshBoolean(() => !refreshBoolean);
  };

  const createCardDatabase = async (
    question,
    answer,
    id,
    cardId,
    currentDate
  ) => {
    const userEmail = String(await fireauth.currentUser.email);
    const deckRef = firestore
      .collection("users")
      .doc(userEmail)
      .collection("decks")
      .doc(id)
      .collection("cards")
      .doc(cardId);
    await deckRef.set({
      question: question,
      answer: answer,
      boxType: 1,
      id: cardId,
      date: currentDate,
    });
    await firestore
      .collection("users")
      .doc(userEmail)
      .update({
        "stats.cardsCreated": firebase.firestore.FieldValue.increment(1),
      });
    userStatsLocal[0]["cardsCreated"] = userStatsLocal[0]["cardsCreated"] + 1;
    updateObjectiveStatusLocally();
  };

  const createFlashcardHandler = (question, answer) => {
    const currentDate =
      String(new Date().getFullYear()) +
      "/" +
      String(new Date().getMonth() + 1) +
      "/" +
      String(new Date().getDate());
    const id = nanoid();
    const card = {
      id: id,
      question,
      answer,
      boxType: 1,
    };
    createCardDatabase(question, answer, decks[index]["id"], id, currentDate);
    dispatch(Decks.createFlashcard(index, card));
    dispatch(Decks.pushOntoStudydeck(index, card));
    setVisible(false);
    if (decks[index].cards.length === 0) {
      setEmpty(false);
    }
  };

  const deleteCardDatabase = async (id, index) => {
    const userEmail = String(await fireauth.currentUser.email);
    await firestore
      .collection("users")
      .doc(userEmail)
      .collection("decks")
      .doc(decks[index]["id"])
      .collection("cards")
      .doc(id)
      .delete();
    await firestore
      .collection("users")
      .doc(userEmail)
      .update({
        "stats.cardsDeleted": firebase.firestore.FieldValue.increment(1),
      });
    userStatsLocal[0]["cardsDeleted"] = userStatsLocal[0]["cardsDeleted"] + 1;
    updateObjectiveStatusLocally();
  };

  const deleteFlashcardHandler = (id) => {
    deleteCardDatabase(id, index);
    dispatch(Decks.deleteFlashcard(index, id));
    if (decks[index].cards.length === 1) {
      setEmpty(true);
    }
  };

  const [visible, setVisible] = React.useState(false);
  const showModal = () => {
    setVisible(true);
  };
  const hideModal = () => setVisible(false);

  const [visibleInformation, setVisibleInformation] = React.useState(false);
  const showInformationModal = () => {
    setVisibleInformation(true);
  };
  const hideInformationModal = () => setVisibleInformation(false);

  const [visibleHelp, setVisibleHelp] = React.useState(false);
  const showHelpModal = () => {
    setVisibleHelp(true);
  };
  const hideHelpModal = () => setVisibleHelp(false);

  const renderItem = (flashcard) => (
    <FlashCard
      question={flashcard.item.question}
      answer={flashcard.item.answer}
      boxType={flashcard.item.boxType}
      id={flashcard.item.id}
      deleteCard={deleteFlashcardHandler}
    />
  );

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

  return (
    <SafeAreaView style={{ minHeight: Math.round(windowHeight) }}>
      <Portal>
        <Modal
          visible={visibleInformation}
          onDismiss={hideInformationModal}
          contentContainerStyle={[
            styles.modal,
            {
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.surface,
              alignItems: "center",
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              width: "70%",
              alignSelf: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <Title style={{ fontFamily: "PoppinsBold", alignSelf: "center" }}>
              Card Colours
            </Title>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={hideInformationModal}
            >
              <Ionicons name="ios-close-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontFamily: "PoppinsRegular",
              color: theme.colors.text,
            }}
          >
            Box Type 1 (Grey):
          </Text>
          <View style={[styles.boxShape, { backgroundColor: "#CCCFBC" }]} />
          <Text
            style={{ fontFamily: "PoppinsRegular", color: theme.colors.text }}
          >
            Box Type 2 (Orange):
          </Text>
          <View style={[styles.boxShape, { backgroundColor: "#ff9f68" }]} />
          <Text
            style={{ fontFamily: "PoppinsRegular", color: theme.colors.text }}
          >
            Box Type 3 (Red):
          </Text>
          <View style={[styles.boxShape, { backgroundColor: "#FF7F7F" }]} />
          <Text
            style={{ fontFamily: "PoppinsRegular", color: theme.colors.text }}
          >
            Box Type 4 (Gold):
          </Text>
          <LinearGradient
            style={styles.boxShape}
            colors={["#FCC201", "#EEB609", "#DBA514", "#C69320", "#B78628"]}
          />
          <Text
            style={{ fontFamily: "PoppinsRegular", color: theme.colors.text }}
          >
            Box Type 5 (Multicoloured):
          </Text>
          <LinearGradient
            style={styles.boxShape}
            colors={["#86E3CE", "#D0E6A5", "#FFDD94", "#FA897B", "#CCABD8"]}
          />
        </Modal>
        <Modal
          visible={visibleHelp}
          onDismiss={hideHelpModal}
          contentContainerStyle={[
            styles.modal,
            {
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.surface,
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Title style={{ fontFamily: "PoppinsBold" }}>Help</Title>
            <TouchableOpacity onPress={hideHelpModal}>
              <Ionicons name="ios-close-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Text
            style={{ fontFamily: "PoppinsRegular", color: theme.colors.text }}
          >
            1) To create a card, press on the "+" button on the bottom right.
            {"\n"}
            {"\n"}2) To delete a card, press and hold on the card. An alert will
            appear to prompt you of the deletion. {"\n"}
            {"\n"}3) To flip a card, simply tap on the card.{"\n"}
            {"\n"}
            4) To upgrade a card to the next box type, you will have to
            correctly answer that card on your first try during your study
            session!{"\n"}
          </Text>
        </Modal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={[
            styles.modalCardForm,
            {
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.surface,
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Title style={{ fontFamily: "PoppinsBold" }}>
              Create a flashcard
            </Title>
            <TouchableOpacity onPress={hideModal}>
              <Ionicons name="ios-close-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <FlashCardForm createFlashcardHandler={createFlashcardHandler} />
        </Modal>
        <FAB
          visible={
            !visibleInformation &&
            !keyboardIsActive &&
            !visibleHelp &&
            !visible &&
            isFocused
          }
          style={[
            styles.fab,
            {
              backgroundColor: theme.colors.secondary,
            },
          ]}
          icon="plus"
          color={theme.colors.onPrimary}
          onPress={showModal}
        />
      </Portal>
      <View style={styles.helpIconView}>
        <View style={styles.searchbarView}>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchbar}
            onFocus={() => setKeyboardIsActive(true)}
            onBlur={() => setKeyboardIsActive(false)}
          ></Searchbar>
        </View>
        <TouchableOpacity
          onPress={showInformationModal}
          style={{ justifyContent: "center" }}
        >
          <Avatar.Icon icon="information-variant" size={26} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={showHelpModal}
          style={{ justifyContent: "center" }}
        >
          <Avatar.Icon icon="account-question" size={26} />
        </TouchableOpacity>
      </View>
      {empty ? (
        <View
          style={{
            flex: 1,
          }}
        >
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text
              style={[
                styles.title,
                {
                  color: theme.colors.text,
                  fontFamily: "PoppinsLight",
                },
              ]}
            >
              Create a card by pressing this button!
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <Image
              source={require("../../../assets/images/emptydoodle_cropped.png")}
              style={styles.doodle}
              resizeMode="contain"
            ></Image>
          </View>
        </View>
      ) : (
        <FlatList
          data={searchQuery === "" ? decks[index].cards : filteredCards}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View style={styles.footer} />}
        />
      )}
    </SafeAreaView>
  );
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = ScaledSheet.create({
  searchbarView: {
    height: (windowHeight * 7) / 100,
    width: windowWidth * 0.78,
    justifyContent: "center",
  },
  helpIconView: {
    height: (windowHeight * 7) / 100,
    width: (windowWidth * 95) / 100,
    alignSelf: "center",
    justifyContent: "space-around",
    marginTop: (windowHeight * 2) / 100,
    flexDirection: "row",
  },
  searchbar: {
    width: windowWidth * 0.78,
    height: windowHeight * 0.05,
  },
  boxShape: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.1,
  },
  doodle: {
    width: (windowWidth * 70) / 100,
    bottom: (windowHeight * 8) / 100,
    marginLeft: (windowWidth * 8) / 100,
    flex: 1,
  },
  title: {
    fontSize: "39@s",
    textAlign: "center",
    //bottom: "230@s",
  },
  fab: {
    alignSelf: "flex-end",
    top: "80.5%",
    right: "4.5%",
    elevation: 6,
  },
  modalCardForm: {
    padding: "10@s",
    borderRadius: "20@s",
    borderWidth: "1@s",
    shadowOffset: { width: "1@s", height: "1@s" },
    shadowColor: "#333",
    shadowOpacity: "0.3@s",
    shadowRadius: "2@s",
    marginHorizontal: "4@s",
    marginVertical: "6@s",
    elevation: "24@s",
    flex: 1,
  },
  modal: {
    padding: "10@s",
    borderRadius: "20@s",
    borderWidth: "1@s",
    shadowOffset: { width: "1@s", height: "1@s" },
    shadowColor: "#333",
    shadowOpacity: "0.3@s",
    shadowRadius: "2@s",
    marginHorizontal: "4@s",
    marginVertical: "6@s",
    elevation: "24@s",
  },
  footer: {
    height: windowHeight * 0.45,
  },
});

export default ViewingComponent;
