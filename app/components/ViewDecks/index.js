import React, { useEffect, useState } from "react";
import {
  Portal,
  Modal,
  FAB,
  useTheme,
  Title,
  Avatar,
  Searchbar,
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
  useWindowDimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Decks from "../../../store/slices/deckSlice";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { useIsFocused } from "@react-navigation/core";
import styles from "./styles";
import { useFonts } from "expo-font";
import firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import CustomButton from "../common/CustomButton";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  ShineOverlay,
} from "rn-placeholder";

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
  const [filteredDecks, setFilteredDecks] = useState([]);
  const [empty, setEmpty] = useState(!decks.length);
  const [index, setIndex] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [refreshBoolean, setRefreshBoolean] = useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [keyboardIsActive, setKeyboardIsActive] = useState(false);
  const onChangeSearch = (query) => setSearchQuery(query);
  const windowHeight = useWindowDimensions().height;
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const [isLoading, setIsLoading] = useState(!decks.length);

  useEffect(() => {
    setFilteredDecks(
      decks.filter(
        (deck) =>
          deck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          deck.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  const onRefresh = () => {
    setRefreshing(true);
    setIsLoading(true);
    setRefreshBoolean(() => !refreshBoolean);
  };

  const createDeckDatabase = async (title, subtitle, id) => {
    const userEmail = await String(fireauth.currentUser.email);
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
    await firestore.collection("users").doc(userEmail).update({
      'stats.decksCreated': firebase.firestore.FieldValue.increment(1)
    })
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
        setIsLoading(false);
      }
    } else {
      console.log(id);
      dispatch(Decks.createDeck(id, title, subtitle, [], []));
      createDeckDatabase(title, subtitle, id);
      setVisible(false);
      if (decks.length === 0) {
        setEmpty(false);
        setIsLoading(false);
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
        setIsLoading(false);
        console.log("Decks already loaded");
      } else {
        setIsLoading(false);
        console.log("No decks");
      }
    }, 1000);
    setRefreshing(false);
  }, [refreshBoolean]);

  const isFocused = useIsFocused();

  const theme = useTheme();

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [visibleUploadPDFModal, setVisibleUploadPDFModal] =
    React.useState(false);
  const showUploadPDFModal = () => setVisibleUploadPDFModal(true);
  const hideUploadPDFModal = () => setVisibleUploadPDFModal(false);

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
    const userEmail = await String(fireauth.currentUser.email);
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
    await firestore.collection("users").doc(userEmail).update({
      'stats.cardsCreated': firebase.firestore.FieldValue.increment(1)
    })
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
      } else if ((boxType === 4 || boxType === 5) && cardDays >= 14) {
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
    const userEmail = await String(fireauth.currentUser.email);
    await firestore
      .collection("users")
      .doc(userEmail)
      .collection("decks")
      .doc(id)
      .delete();
    await firestore.collection("users").doc(userEmail).update({
      'stats.decksDeleted': firebase.firestore.FieldValue.increment(1)
    })
  };

  const deleteDeckHandler = (id) => {
    deleteDeckDatabase(id);
    dispatch(Decks.deleteDeck(id));
    if (decks.length === 1) {
      setEmpty(true);
      setIsLoading(false);
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
        minHeight: Math.round(windowHeight),
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
            1) To create a deck, press on the "+" button located on the bottom
            right.
          </Text>
          <View style={{ flexDirection: "row", paddingLeft: 10 }}>
            <Text
              style={{ fontFamily: "PoppinsRegular", color: theme.colors.text }}
            >
              a){" "}
            </Text>
            <Text
              style={{ fontFamily: "PoppinsRegular", color: theme.colors.text }}
            >
              Press on the button with the "Create Deck" label to manually
              create a deck.
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingLeft: 10,
            }}
          >
            <Text
              style={{ fontFamily: "PoppinsRegular", color: theme.colors.text }}
            >
              b){" "}
            </Text>
            <Text
              style={{ fontFamily: "PoppinsRegular", color: theme.colors.text }}
            >
              Press on the button with the "Upload PDF" label to create a deck
              from your PDF file.
            </Text>
          </View>
          <Text
            style={{ fontFamily: "PoppinsRegular", color: theme.colors.text }}
          >
            {"\n"}2) To delete a deck, press on the "⋮" icon located on the top
            right of that deck. A "delete deck" button will appear. Press on
            that button to proceed with the deletion of the deck. {"\n"}
            {"\n"}3) To study your cards, press on the left button of that deck
            titled "Study". An alert will appear if there are currently no cards
            to be studied.{"\n"}
            {"\n"}4) To view cards in your deck, press on the middle button of
            that deck titled "View".{"\n"}
            {"\n"}5) To add a card to your deck, press on the right button of
            that deck titled "Add Card".{"\n"}
            {"\n"}6) To study all the cards in a deck, press on the bottom
            button titled "Study All Cards" of that deck.{"\n"}
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Title style={{ fontFamily: "PoppinsBold" }}>Create a deck</Title>
            <TouchableOpacity onPress={hideModal}>
              <Ionicons name="ios-close-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <ReviewFormComponent createDeckHandler={createDeckHandler} />
        </Modal>
        <Modal
          visible={visibleUploadPDFModal}
          onDismiss={hideUploadPDFModal}
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Title style={{ fontFamily: "PoppinsBold" }}>Upload PDF</Title>
            <TouchableOpacity onPress={hideUploadPDFModal}>
              <Ionicons name="ios-close-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.uploadPDFwrapper}>
            <FontAwesome name="file-pdf-o" size={40} color="black" />
            <Text style={{ fontFamily: "PoppinsMedium" }}>
              Upload your PDF file here
            </Text>
          </TouchableOpacity>
          <CustomButton title="Submit"></CustomButton>
        </Modal>
        <Modal
          visible={visibleAddCardModal}
          onDismiss={hideAddCardModal}
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
            <TouchableOpacity onPress={hideAddCardModal}>
              <Ionicons name="ios-close-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <FlashCardForm createFlashcardHandler={createFlashcardHandler} />
        </Modal>
        <FAB.Group
          visible={
            !keyboardIsActive &&
            !visibleHelp &&
            !visible &&
            !visibleAddCardModal &&
            isFocused
          }
          open={open}
          icon={open ? "close" : "plus"}
          actions={[
            {
              icon: "credit-card-plus",
              label: "Create Deck",
              onPress: () => {
                showModal();
              },
            },
            {
              icon: "file-upload",
              label: "Upload PDF",
              onPress: () => showUploadPDFModal(),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
          style={styles.fabGroup}
          fabStyle={{ backgroundColor: theme.colors.secondary }}
          color={theme.colors.onPrimary}
        />
      </Portal>
      <View style={styles.helpIconView}>
        <View style={{ flex: 1, justifyContent: "center" }}>
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
          onPress={showHelpModal}
          style={{ justifyContent: "center" }}
        >
          <Avatar.Icon icon="account-question" size={26} />
        </TouchableOpacity>
      </View>
      {isLoading && (
        <View
          style={{
            width: responsiveWidth(95),
            alignItems: "center",
            alignSelf: "center",
            marginTop: responsiveHeight(1),
          }}
        >
          <Placeholder
            Animation={ShineOverlay}
            style={{
              borderRadius: 4,
              alignSelf: "center",
              overflow: "hidden",
            }}
          >
            <PlaceholderMedia
              style={{
                height: responsiveHeight(32),
                width: responsiveWidth(100),
                marginBottom: responsiveHeight(1),
                elevation: 8,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4.65,
              }}
            />
            <PlaceholderMedia
              style={{
                height: responsiveHeight(32),
                width: responsiveWidth(100),
                marginBottom: responsiveHeight(1),
                elevation: 8,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4.65,
              }}
            />
            <PlaceholderMedia
              style={{
                height: responsiveHeight(32),
                width: responsiveWidth(100),
                marginBottom: responsiveHeight(1),
                elevation: 8,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4.65,
              }}
            />
          </Placeholder>
        </View>
      )}
      {!isLoading && empty ? (
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
          data={searchQuery === "" ? decks : filteredDecks}
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
