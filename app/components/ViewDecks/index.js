import React, {useEffect} from "react";
import { Portal, Modal, FAB, useTheme } from "react-native-paper";
import ReviewFormComponent from "../common/reviewForm";
import CustomCard from "../common/CustomCard";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Decks from "../../../store/slices/deckSlice";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { useIsFocused } from "@react-navigation/core";
import Amplify,{API, graphqlOperation} from "aws-amplify";
import * as mutations from "../../../src/graphql/mutations";
import * as query from "../../../src/graphql/queries";
import * as subscription from "../../../src/graphql/subscriptions";

import awsconfig from "../../../src/aws-exports";
import AsyncStorage from "@react-native-async-storage/async-storage";

Amplify.configure(awsconfig);


function DeckComponent(props) {
  const dispatch = useDispatch();
  const decks = useSelector(Decks.getDecks);
  const [userInfo, setUserInfo] = React.useState([]);



  const createDeckHandler = (title, subtitle) => {
    dispatch(Decks.createDeck(nanoid(), title, subtitle));
    newDeck(title,subtitle,userInfo[0]["id"])
    setVisible(false);
  };

  const isFocused = useIsFocused();

  const theme = useTheme();

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const deleteDeckHandler = (id) => {
    dispatch(Decks.deleteDeck(id));
  };

  const renderItem = (deck) => (
    <CustomCard
      title={deck.item.title}
      subtitle={deck.item.subtitle}
      deleteCard={deleteDeckHandler}
      id={deck.item.id}
    />
  );



  const fetchUsers = async() => {
      let user = null;
      try {
          user = await AsyncStorage.getItem("userInfo").then((req) =>
              JSON.parse(req));
          let filter = {
              email: {
                  contains: user[0]
              }
          }
          const userDetails = {
              email: user[0]
          }
          const checkUser = await API.graphql({query:query.listUsers, variables: {filter: filter}});
          setUserInfo(checkUser.data.listUsers.items);
          if (checkUser.data.listUsers.items.length === 0) {
              const userDetails = {
                  email: user[0]
              }
              await API.graphql(graphqlOperation(mutations.createUser, {input: userDetails}));
          }
      } catch (err) {
          console.log(err);
      }
  };



  useEffect(() => {
      fetchUsers();
  },[]);

  async function newDeck(titleText,subtitleText,userIDText) {
      let deckDetails = {
          title: titleText,
          subtitle: subtitleText,
          userID : userIDText
      }
      console.log('working');
      try{
          const newDeck = await API.graphql(graphqlOperation(mutations.createDeck,{input: deckDetails}))
      } catch(err) {
          console.log(err);
      }

  }



  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.colors.background,
        ...props.style,
      }}
      {...props}
    >
      <FlatList
        ListHeaderComponent={
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={{
                backgroundColor: theme.colors.background,
                borderWidth: 1,
                borderColor: theme.colors.surface,
                padding: 10,
                fontSize: 18,
                borderRadius: 6,
                shadowOffset: { width: 1, height: 1 },
                shadowColor: "#333",
                shadowOpacity: 0.3,
                shadowRadius: 2,
                marginHorizontal: 4,
                marginVertical: 6,
              }}
            >
              <ReviewFormComponent createDeckHandler={createDeckHandler} />
            </Modal>
            <FAB
              visible={isFocused}
              style={{
                alignSelf: "flex-end",
                top: 580,
                right: 16,
                backgroundColor: theme.colors.secondary,
              }}
              icon="plus"
              color={theme.colors.onPrimary}
              onPress={showModal}
            />
          </Portal>
        }
        data={decks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={500}
      />
    </SafeAreaView>
  );
}

export default DeckComponent;
