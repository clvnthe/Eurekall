import React, { useEffect, useState } from "react";
import {
  Portal,
  Modal,
  FAB,
  useTheme,
  Title,
  Avatar,
  Searchbar,
  Card,
  ProgressBar,
  ActivityIndicator,
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
import { objectivesData } from "../../../assets/data/objectivesData";
import { userStatsLocal } from "../../../assets/data/userStatsLocal";
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
import axios from "axios";

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
  let mlText = [];
  let numOfDecks = decks.length;
  const [mlIsLoading, setMlIsLoading] = useState(false);
  const [mlProgress, setMlProgress] = useState(0);
  const [mlProgressText, setMlProgressText] = useState("");

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

  // const test_text = 'The Empire of Japan aimed to dominate Asia and the Pacific and was already at war with the Republic of China in 1937, but the world war is generally said to have begun on 1 September 1939 with the invasion of Poland by Germany and subsequent declarations of war on Germany by France and the United Kingdom. From late 1939 to early 1941, in a series of campaigns and treaties, Germany conquered or controlled much of continental Europe, and formed the Axis alliance with Italy and Japan. Under the Molotov-Ribbentrop Pact of August 1939, Germany and the Soviet Union partitioned and annexed territories of their European neighbours, Poland, Finland, Romania and the Baltic states. The war continued primarily between the European Axis powers and the coalition of the United Kingdom and the British Commonwealth, with campaigns including the North Africa and East Africa campaigns, the aerial Battle of Britain, the Blitz bombing campaign, the Balkan Campaign as well as the long-running Battle of the Atlantic. In June 1941, the European Axis powers launched an invasion of the Soviet Union, opening the largest land theatre of war in history, which trapped the major part of the Axis\' military forces into a war of attrition. In December 1941, Japan attacked the United States and European territories in the Pacific Ocean, and quickly conquered much of the Western Pacific.'
  function generateQuestions(test_text) {
    return new Promise((resolve, reject) => {
      axios
        .post("https://plated-hash-320814.as.r.appspot.com/generate/", {
          text: test_text,
        })
        .then((response) => {
          mlText = response["data"]["result"];
          //setMLText(qna);
          console.log(mlText);
        })
        .then(() => {
          console.log(mlText);
          resolve();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

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
    await firestore
      .collection("users")
      .doc(userEmail)
      .update({
        "stats.decksCreated": firebase.firestore.FieldValue.increment(1),
      });
    userStatsLocal[0]["decksCreated"] = userStatsLocal[0]["decksCreated"] + 1;
    updateObjectiveStatusLocally();
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
      numOfDecks = ++numOfDecks;
    }
  };

  const createMlDeckHandler = async (
    title,
    subtitle,
    paragraph,
    id = nanoid()
  ) => {
    setMlIsLoading(true);
    setMlProgressText("Generating questions...");
    setMlProgress(1);
    await generateQuestions(paragraph);
    setMlProgressText("Creating deck...");
    setMlProgress(2);
    dispatch(Decks.createDeck(id, title, subtitle, [], []));
    console.log("deck created");
    await createDeckDatabase(title, subtitle, id);
    console.log("deck created on firebase");
    setVisibleUploadPDFModal(false);
    console.log("modal closed");
    if (decks.length === 0) {
      setEmpty(false);
      setIsLoading(false);
    }
    const mlDeckIndex = numOfDecks;
    console.log("mlDeckIndex is", mlDeckIndex);
    setMlProgressText("Creating card(s)...");
    setMlProgress(3);
    mlText.forEach((mlTextItem) => {
      console.log("creating cards");
      createMlFlashcardHandler(mlTextItem[0], mlTextItem[1], mlDeckIndex, id);
    });
    numOfDecks = ++numOfDecks;
    console.log("done");
    setMlIsLoading(false);
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
    await firestore
      .collection("users")
      .doc(userEmail)
      .update({
        "stats.cardsCreated": firebase.firestore.FieldValue.increment(1),
      });
    userStatsLocal[0]["cardsCreated"] = userStatsLocal[0]["cardsCreated"] + 1;
    updateObjectiveStatusLocally();
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

  const createMlFlashcardHandler = (
    question,
    answer,
    mlDeckIndex,
    mlDeckID,
    boxType = 1,
    id = nanoid(),
    inputDate = currentDate
  ) => {
    const card = {
      id: id,
      question,
      answer,
      boxType: boxType,
      date: inputDate,
    };
    createCardDatabase(question, answer, mlDeckID, id, inputDate);
    dispatch(Decks.createFlashcard(mlDeckIndex, card));
    dispatch(Decks.pushOntoStudydeck(mlDeckIndex, card));
  };

  const deleteDeckDatabase = async (id) => {
    const userEmail = await String(fireauth.currentUser.email);
    await firestore
      .collection("users")
      .doc(userEmail)
      .collection("decks")
      .doc(id)
      .delete();
    await firestore
      .collection("users")
      .doc(userEmail)
      .update({
        "stats.decksDeleted": firebase.firestore.FieldValue.increment(1),
      });
    userStatsLocal[0]["decksDeleted"] = userStatsLocal[0]["decksDeleted"] + 1;
    updateObjectiveStatusLocally();
  };

  const deleteDeckHandler = (id) => {
    deleteDeckDatabase(id);
    dispatch(Decks.deleteDeck(id));
    if (decks.length === 1) {
      setEmpty(true);
      setIsLoading(false);
    }
    numOfDecks = --numOfDecks;
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
              <Ionicons
                name="ios-close-outline"
                size={24}
                color={theme.colors.text}
              />
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
              style={{
                fontFamily: "PoppinsRegular",
                color: theme.colors.text,
                paddingRight: 5,
              }}
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
              style={{
                fontFamily: "PoppinsRegular",
                color: theme.colors.text,
              }}
            >
              b){" "}
            </Text>
            <Text
              style={{
                fontFamily: "PoppinsRegular",
                color: theme.colors.text,
                paddingRight: 5,
              }}
            >
              Press on the button with the "Upload Your Notes" label to create a
              deck from your notes. This button will auto-generate cards for
              your newly-created deck based on your notes.
            </Text>
          </View>
          <Text
            style={{ fontFamily: "PoppinsRegular", color: theme.colors.text }}
          >
            2) To delete a deck, press on the "⋮" icon located on the top right
            of that deck. A "delete deck" button will appear. Press on that
            button to proceed with the deletion of the deck. {"\n"}
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
              <Ionicons
                name="ios-close-outline"
                size={24}
                color={theme.colors.text}
              />
            </TouchableOpacity>
          </View>
          <ReviewFormComponent
            createDeckHandler={createDeckHandler}
            createMlDeckHandler={createMlDeckHandler}
          />
        </Modal>
        <Modal
          visible={visibleUploadPDFModal}
          onDismiss={hideUploadPDFModal}
          dismissable={!mlIsLoading}
          contentContainerStyle={[
            styles.modalCardForm,
            {
              justifyContent: "flex-start",
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
              Upload Your Notes
            </Title>
            {mlIsLoading ? (
              <ActivityIndicator
                animating={true}
                color={theme.colors.primary}
              />
            ) : (
              <TouchableOpacity onPress={hideUploadPDFModal}>
                <Ionicons
                  name="ios-close-outline"
                  size={24}
                  color={theme.colors.text}
                />
              </TouchableOpacity>
            )}
          </View>
          {mlIsLoading ? (
            <View>
              <ProgressBar
                progress={mlProgress / 3}
                color={theme.colors.primary}
                style={{ height: responsiveHeight(0.5), borderRadius: 20 }}
              />
              <Text
                style={{ fontFamily: "PoppinsLight", color: theme.colors.text }}
              >
                {mlProgressText}
              </Text>
            </View>
          ) : (
            <ReviewFormComponent
              autoGeneratorUI
              createDeckHandler={createDeckHandler}
              createMlDeckHandler={createMlDeckHandler}
            />
          )}
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
              <Ionicons
                name="ios-close-outline"
                size={24}
                color={theme.colors.text}
              />
            </TouchableOpacity>
          </View>
          <FlashCardForm createFlashcardHandler={createFlashcardHandler} />
        </Modal>
        <FAB.Group
          visible={
            !isLoading &&
            !keyboardIsActive &&
            !visibleHelp &&
            !visible &&
            !visibleAddCardModal &&
            !visibleUploadPDFModal &&
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
              label: "Upload Your Notes",
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
      {isLoading && ( //SKELETON PLACEHOLDER UI
        <View
          style={{
            width: responsiveWidth(100),
            alignItems: "center",
            alignSelf: "center",
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
            <Card
              style={{
                margin: 10,
                elevation: 8,
                padding: 10,
              }}
            >
              <PlaceholderLine
                style={{
                  height: responsiveHeight(5),
                  width: responsiveWidth(50),
                }}
              />
              <PlaceholderLine style={{ width: responsiveWidth(30) }} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <PlaceholderMedia
                  style={{
                    height: responsiveHeight(13.5),
                    width: responsiveWidth(27),
                    borderRadius: 10,
                    elevation: 2,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                  }}
                />
                <PlaceholderMedia
                  style={{
                    height: responsiveHeight(13.5),
                    width: responsiveWidth(27),
                    borderRadius: 10,
                    elevation: 2,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                  }}
                />
                <PlaceholderMedia
                  style={{
                    height: responsiveHeight(13.5),
                    width: responsiveWidth(27),
                    borderRadius: 10,
                    elevation: 2,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                  }}
                />
              </View>
              <PlaceholderMedia
                style={{
                  width: responsiveWidth(89),
                  marginTop: 10,
                  borderRadius: 10,
                  elevation: 2,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                }}
              />
            </Card>
            <Card
              style={{
                margin: 10,
                elevation: 8,
                padding: 10,
              }}
            >
              <PlaceholderLine
                style={{
                  height: responsiveHeight(5),
                  width: responsiveWidth(50),
                }}
              />
              <PlaceholderLine style={{ width: responsiveWidth(30) }} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <PlaceholderMedia
                  style={{
                    height: responsiveHeight(13.5),
                    width: responsiveWidth(27),
                    borderRadius: 10,
                    elevation: 2,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                  }}
                />
                <PlaceholderMedia
                  style={{
                    height: responsiveHeight(13.5),
                    width: responsiveWidth(27),
                    borderRadius: 10,
                    elevation: 2,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                  }}
                />
                <PlaceholderMedia
                  style={{
                    height: responsiveHeight(13.5),
                    width: responsiveWidth(27),
                    borderRadius: 10,
                    elevation: 2,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                  }}
                />
              </View>
              <PlaceholderMedia
                style={{
                  width: responsiveWidth(89),
                  marginTop: 10,
                  borderRadius: 10,
                  elevation: 2,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                }}
              />
            </Card>
            <Card
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
