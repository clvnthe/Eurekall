import React, { useEffect, useState } from "react";
import { Portal, Modal, FAB, useTheme } from "react-native-paper";
import ReviewFormComponent from "../common/reviewForm";
import FlashCardForm from "../common/flashcardForm";
import CustomCard from "../common/CustomCard";
import { FlatList, SafeAreaView, Text, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Decks from "../../../store/slices/deckSlice";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { useIsFocused } from "@react-navigation/core";
import styles from "./styles";
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
    console.log(id);
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

  const loadDeckDatabase = (deckRetrieve) => {
    deckRetrieve.forEach((doc) => {
      createDeckHandler(
        doc.data().title,
        doc.data().subtitle,
        doc.data().id,
        true
      );
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
          loadDeckDatabase(deckRetrieve);
        }
        console.log("Decks already loaded");
      } else {
        console.log("No decks");
      }
    }, 0);
  }, []);

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

  const createFlashcardHandler = (question, answer) => {
    const card = {
      id: nanoid(),
      question,
      answer,
      boxType: 1,
    };
    dispatch(Decks.createFlashcard(index, card));
    dispatch(Decks.pushOntoStudydeck(index, card));
    setVisibleAddCardModal(false);
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

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.colors.background,
        ...props.style,
      }}
      {...props}
    >
      <Portal>
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
          visible={isFocused}
          style={[styles.fab, { backgroundColor: theme.colors.secondary }]}
          icon="plus"
          color={theme.colors.onPrimary}
          onPress={showModal}
        />
      </Portal>
      {empty ? (
        <View style={{ flex: 1 }}>
          <Image
            source={require("../../../assets/images/emptydoodle.png")}
            style={styles.doodle}
          ></Image>
          <Text
            style={[
              styles.title,
              {
                color: theme.colors.text,
              },
            ]}
          >
            hmm it seems there are no decks added yet, create a deck by pressing
            this button!
          </Text>
        </View>
      ) : (
        <FlatList
          data={decks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onEndReachedThreshold={500}
        />
      )}
    </SafeAreaView>
  );
}

export default DeckComponent;
