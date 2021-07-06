import React, { useEffect, useState } from "react";
import {
  Portal,
  Modal,
  FAB,
  useTheme,
  Title,
  Avatar,
} from "react-native-paper";
import ReviewFormComponent from "../common/reviewForm";
import FlashCardForm from "../common/flashcardForm";
import CustomCard from "../common/CustomCard";
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  Image,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Decks from "../../../store/slices/deckSlice";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { useIsFocused } from "@react-navigation/core";
import styles from "./styles";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase";

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

function DeckComponent(props) {
  const dispatch = useDispatch();
  const decks = useSelector(Decks.getDecks);
  const [empty, setEmpty] = useState(!decks.length);
  const [index, setIndex] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [refreshBoolean, setRefreshBoolean] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshBoolean(() => !refreshBoolean);
  };

  const createDeckDatabase = async (title, subtitle, id) => {
    const userEmail = String(await fireauth.currentUser.email);
    const deckRef = firestore
      .collection("users")
      .doc(userEmail)
      .collection("decks")
      .doc(id);
    await deckRef.set({
      title: title,
      subtitle: subtitle,
      id: id,
    });
  };

  const createDeckHandler = (
    title,
    subtitle,
    id = nanoid(),
    loadStatus = false
  ) => {
    if (loadStatus) {
      dispatch(Decks.createDeck(id, title, subtitle, [], []));
      setVisible(false);
      if (decks.length === 0) {
        setEmpty(false);
      }
    } else {
      console.log(id);
      dispatch(Decks.createDeck(id, title, subtitle, [], []));
      createDeckDatabase(title, subtitle, id);
      setVisible(false);
      if (decks.length === 0) {
        setEmpty(false);
      }
    }
  };

  const loadCardDatabaseForDeck = async (deckID, userEmail, indexer) => {
    const retrieveCardRef = firestore
      .collection("users")
      .doc(userEmail)
      .collection("decks")
      .doc(deckID)
      .collection("cards");
    const retrieveCards = await retrieveCardRef.get();
    if (retrieveCards.empty) {
      console.log("no cards");
    } else {
      retrieveCards.forEach((doc) => {
        // console.log(doc.data());
        createFlashcardHandler(
          doc.data()["question"],
          doc.data()["answer"],
          doc.data()["boxType"],
          doc.data()["id"],
          doc.data()["date"],
          indexer,
          true
        );
      });
    }
  };

  const loadDeckDatabase = (deckRetrieve, userEmail) => {
    var indexer = 0;
    deckRetrieve.forEach((doc) => {
      createDeckHandler(
        doc.data()["title"],
        doc.data()["subtitle"],
        doc.data()["id"],
        true
      );
      loadCardDatabaseForDeck(doc.data()["id"], userEmail, indexer);
      indexer++;
    });
  };

  useEffect(() => {
    setTimeout(async () => {
      const userEmail = String(await fireauth.currentUser.email);
      const retrieveDeckRef = firestore
        .collection("users")
        .doc(userEmail)
        .collection("decks");

      const deckRetrieve = await retrieveDeckRef.get();
      if (!deckRetrieve.empty) {
        if (decks.length === 0) {
          loadDeckDatabase(deckRetrieve, userEmail);
        }
        console.log("Decks already loaded");
      } else {
        console.log("No decks");
      }
    }, 0);
    setRefreshing(false);
  }, [refreshBoolean]);

  const isFocused = useIsFocused();

  const theme = useTheme();

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [visibleAddCardModal, setVisibleAddCardModal] = useState(false);
  const showAddCardModal = (id) => {
    setIndex(decks.findIndex((deck) => deck.id === id));
    setVisibleAddCardModal(true);
  };
  const hideAddCardModal = () => setVisibleAddCardModal(false);

  const [visibleHelp, setVisibleHelp] = React.useState(false);
  const showHelpModal = () => {
    setVisibleHelp(true);
  };
  const hideHelpModal = () => setVisibleHelp(false);

  const dateComparator = (inputDate) => {
    const currentDateTemp =
      String(new Date().getFullYear()) +
      "/" +
      String(new Date().getMonth() + 1) +
      "/" +
      String(new Date().getDate());
    const currentDate = new Date(currentDateTemp);
    const inputDateActual = new Date(inputDate);
    const dateDiffMilSec = Math.abs(inputDateActual - currentDate);
    const dateDays = dateDiffMilSec / (1000 * 60 * 60 * 24);
    return dateDays;
  };

  const currentDate =
    String(new Date().getFullYear()) +
    "/" +
    String(new Date().getMonth() + 1) +
    "/" +
    String(new Date().getDate());

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
  };

  const createFlashcardHandler = (
    question,
    answer,
    boxType = 1,
    id = nanoid(),
    inputDate = currentDate,
    cardtoDeckIndex = 0,
    loadStatus = false
  ) => {
    if (loadStatus) {
      const card = {
        id: id,
        question,
        answer,
        boxType: boxType,
      };
      const index = cardtoDeckIndex;
      dispatch(Decks.createFlashcard(index, card));
      const cardDays = dateComparator(inputDate);
      if (boxType === 1) {
        dispatch(Decks.pushOntoStudydeck(index, card));
      } else if (boxType === 2 && cardDays >= 2) {
        dispatch(Decks.pushOntoStudydeck(index, card));
      } else if (boxType === 3 && cardDays >= 7) {
        dispatch(Decks.pushOntoStudydeck(index, card));
      } else if (boxType === 4 && cardDays >= 14) {
        dispatch(Decks.pushOntoStudydeck(index, card));
      }
      setVisibleAddCardModal(false);
    } else {
      const card = {
        id: id,
        question,
        answer,
        boxType: boxType,
        date: inputDate,
      };
      createCardDatabase(question, answer, decks[index]["id"], id, inputDate);
      dispatch(Decks.createFlashcard(index, card));
      dispatch(Decks.pushOntoStudydeck(index, card));
      setVisibleAddCardModal(false);
    }
  };

  const deleteDeckDatabase = async (id) => {
    const userEmail = String(await fireauth.currentUser.email);
    await firestore
      .collection("users")
      .doc(userEmail)
      .collection("decks")
      .doc(id)
      .delete();
  };

  const deleteDeckHandler = (id) => {
    deleteDeckDatabase(id);
    dispatch(Decks.deleteDeck(id));
    if (decks.length === 1) {
      setEmpty(true);
    }
  };

  const renderItem = (deck) => (
    <CustomCard
      title={deck.item.title}
      subtitle={deck.item.subtitle}
      showAddCardModal={showAddCardModal}
      deleteCard={deleteDeckHandler}
      id={deck.item.id}
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
    <SafeAreaView
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
        ...props.style,
      }}
      {...props}
    >
      <Portal>
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
          <Title style={{ fontFamily: "PoppinsBold" }}>Help</Title>
          <Text
            style={{ fontFamily: "PoppinsRegular", color: theme.colors.text }}
          >
            1) To create a deck, press on the "+" button on the bottom right.
            {"\n"}
            {"\n"}2) To delete a deck, press on the "⋮" icon on the top right of
            that deck. A "delete deck" button will appear. Press on that button
            to proceed with the deletion of the deck. {"\n"}
            {"\n"}3) To study your cards, press on the left button titled
            "Study". An alert will appear if there are currently no cards to be
            studied.{"\n"}
            {"\n"}4) To view cards in your deck, press on the middle button
            titled "View".{"\n"}
            {"\n"}5) To add a card to your deck, press on the right button
            titled "Add Card".{"\n"}
          </Text>
        </Modal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          style={{
            justifyContent: "center",
          }}
          contentContainerStyle={[
            styles.modal,
            {
              backgroundColor: theme.colors.background,
            },
          ]}
        >
          <ReviewFormComponent createDeckHandler={createDeckHandler} />
        </Modal>
        <Modal
          visible={visibleAddCardModal}
          onDismiss={hideAddCardModal}
          contentContainerStyle={[
            styles.modal,
            {
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.surface,
            },
          ]}
        >
          <FlashCardForm createFlashcardHandler={createFlashcardHandler} />
        </Modal>
        <FAB
          visible={
            !visibleHelp && !visible && !visibleAddCardModal && isFocused
          }
          style={[styles.fab, { backgroundColor: theme.colors.secondary }]}
          icon="plus"
          color={theme.colors.onPrimary}
          onPress={showModal}
        />
      </Portal>
      <View style={styles.helpIconView}>
        <TouchableOpacity onPress={showHelpModal}>
          <Avatar.Icon icon="account-question" size={26} />
        </TouchableOpacity>
      </View>
      {empty ? (
        <View style={{ flex: 1 }}>
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
              Create a deck by pressing this button!
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
          data={decks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View style={styles.footer} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
}

export default DeckComponent;
