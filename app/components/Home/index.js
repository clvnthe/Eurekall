import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Avatar, Portal, Modal, FAB, useTheme } from "react-native-paper";
import ReviewFormComponent from "../common/reviewForm";
import CustomCard from "../common/CustomCard";
import { FlatList, SafeAreaView } from "react-native";
import colors from "../../../assets/theme/colors";

function HomeComponent(props) {
  const theme = useTheme();

  const LeftContent = (props) => (
    <Avatar.Icon
      {...props}
      icon="cards-playing-outline"
      color={theme.colors.onPrimary}
      backgroundColor={theme.colors.primary}
    />
  );

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [DATA, setDATA] = useState([
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
      subtitle: "First subtitle",
      body: "body",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
      subtitle: "Second subtitle",
      body: "body",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
      subtitle: "Third subtitle",
      body: "body",
    },
  ]);

  const addCard = (card) => {
    card.id = Math.random().toString(); //improve on this id generator (from database or use third-party library)
    setDATA((currentCards) => {
      return [...currentCards, card];
    });
    setVisible(false);
  };

  const deleteCard = (cardID) => {
    setDATA((currentCards) => {
      return currentCards.filter((card) => card.id !== cardID);
    });
  };

  const renderItem = ({ item }) => (
    <CustomCard
      title={item.title}
      subtitle={item.subtitle}
      LeftContent={LeftContent}
      body={item.body}
      deleteCard={deleteCard}
      id={item.id}
    />
  );

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.colors.border,
        ...props.style,
      }}
      {...props}
    >
      <StatusBar
        backgroundColor={theme.colors.background}
        style={theme.dark ? "light" : "dark"}
      />
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
              <ReviewFormComponent addCard={addCard} />
            </Modal>
            <FAB
              style={{
                position: "absolute",
                margin: 16,
                right: 0,
                bottom: 0,
                backgroundColor: theme.colors.secondary,
              }}
              icon="plus"
              color={theme.colors.onPrimary}
              onPress={showModal}
            />
          </Portal>
        }
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

export default HomeComponent;
