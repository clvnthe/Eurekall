import React from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { Divider } from "react-native-paper";
import { Text } from "react-native";
import { View as MotiView, AnimatePresence, useAnimationState } from "moti";
import { useFonts } from "expo-font";
import EStyleSheet from "react-native-extended-stylesheet";
import { LinearGradient } from "expo-linear-gradient";

function Shape({ bg, words, isFront, state }) {
  const [loaded] = useFonts({
    MontserratLight: require("../../../../assets/fonts/Montserrat-Light.ttf"),
    MontserratBold: require("../../../../assets/fonts/Montserrat-Bold.ttf"),
    PoppinsMedium: require("../../../../assets/fonts/Poppins-Medium.ttf"),
    PoppinsBold: require("../../../../assets/fonts/Poppins-Bold.ttf"),
    PoppinsLight: require("../../../../assets/fonts/Poppins-Light.ttf"),
    PoppinsThin: require("../../../../assets/fonts/Poppins-Thin.ttf"),
    PoppinsRegular: require("../../../../assets/fonts/Poppins-Regular.ttf"),
  });
  if (!loaded) {
    return null;
  }

  return (
    <MotiView
      state={state}
      from={{
        opacity: 1,
        rotateY: "-90deg",
      }}
      animate={{
        opacity: 1,
        rotateY: "0deg",
      }}
      exit={{
        opacity: 1,
        rotateY: "90deg",
        perspective: 1000,
      }}
      transition={{
        type: "timing",
        duration: 300,
      }}
      exitTransition={{
        type: "timing",
        duration: 300,
      }}
    >
      <LinearGradient
        style={styles.shape}
        colors={bg.length === 5 ? bg : [bg, bg]}
      >
        <Text style={styles.QA}>{isFront ? "Q." : "A."}</Text>
        <Text style={styles.cardText}>{words}</Text>
      </LinearGradient>
    </MotiView>
  );
}

function FlipCard({ front, back, deleteCard, id, boxType }) {
  const [visible, toggle] = React.useReducer((s) => !s, true);

  const determineBgColour = (boxType) => {
    console.log("hi");
    if (boxType === 0 || boxType === 1) {
      return "#CCCFBC";
    } else if (boxType === 2) {
      return "#ff9f68";
    } else if (boxType === 3) {
      return "#FF7F7F";
    } else if (boxType === 4) {
      return "#96f7d2";
    } else {
      return ["#86E3CE", "#D0E6A5", "#FFDD94", "#FA897B", "#CCABD8"];
    }
  };
  const determineHeight = () => {
    if (front.length > back.length) {
      if (front.length < 110) {
        return 150;
      } else {
        return front.length * 1.5;
      }
    } else {
      if (back.length < 110) {
        return 150;
      } else {
        return back.length * 1.5;
      }
    }
  };

  //for deletion animation
  const animationState = useAnimationState({
    from: {
      opacity: 0,
      translateX: -400,
    },
    to: {
      opacity: 1,
      translateX: 0,
    },
  });

  return (
    <TouchableOpacity
      onPress={toggle}
      onLongPress={() =>
        Alert.alert("Delete card", "Do you want to delete this card?", [
          {
            text: "Cancel",
            onPress: () => {
              console.log("Cancel Pressed");
            },
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              animationState.transitionTo((state) => {
                if (state === "from") {
                  return "to";
                } else {
                  return "from";
                }
              });
              setTimeout(() => deleteCard(id), 300);
            },
          },
        ])
      }
      style={styles.shapeView}
    >
      <View style={{ height: determineHeight(), justifyContent: "center" }}>
        <AnimatePresence exitBeforeEnter>
          {visible && (
            <Shape
              bg={determineBgColour(boxType)}
              words={front}
              isFront={true}
              key={determineBgColour(boxType)}
              state={animationState}
            />
          )}
          {!visible && (
            <Shape
              bg="#f3cf7a"
              words={back}
              key="#f3cf7a"
              state={animationState}
            />
          )}
        </AnimatePresence>
      </View>
    </TouchableOpacity>
  );
}

function FlashCard({ id, question, answer, deleteCard, boxType }) {
  return (
    <View>
      <FlipCard
        front={question}
        back={answer}
        deleteCard={deleteCard}
        id={id}
        boxType={boxType}
      />
      <Divider />
    </View>
  );
}

export default FlashCard;

const styles = EStyleSheet.create({
  shape: {
    justifyContent: "center",
    alignSelf: "center",
    paddingTop: "52rem",
    paddingBottom: "52rem",
    width: "95%",
    borderRadius: "16rem",
  },
  shapeView: {
    padding: "10rem",
  },
  QA: {
    position: "absolute",
    top: 0,
    padding: 10,
    fontFamily: "PoppinsBold",
  },
  cardText: {
    padding: 10,
    textAlign: "center",
    fontFamily: "PoppinsRegular",
  },
});
