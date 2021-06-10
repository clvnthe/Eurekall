import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Surface, Text, TextInput } from "react-native-paper";
import Container from "../../common/Container";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function AnswerComponent(props) {
  const theme = useTheme();

  return (
    <Container>
      <Surface
        style={[styles.answer, { backgroundColor: theme.colors.primary }]}
      >
        <Text style={styles.answerText}>
          A concrete class is a class that has an implementation for all of its
          methods.
        </Text>
      </Surface>
      <Surface style={styles.userAnswer}>
        <Text>You wrote:</Text>
        <Text>I don't know :(</Text>
      </Surface>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          onPress={() => console.log("Correct Answer!")}
        >
          <Icon
            name="check-outline"
            color="#ffffff"
            style={{ alignSelf: "center" }}
            size={40}
          ></Icon>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#F26C68" }]}
          onPress={() => console.log("Wrong Answer!")}
        >
          <Icon
            name="close-outline"
            color="#ffffff"
            style={{ alignSelf: "center" }}
            size={40}
          ></Icon>
        </TouchableOpacity>
      </View>
    </Container>
  );
}

export default AnswerComponent;

const styles = StyleSheet.create({
  answer: {
    width: 330,
    height: 300,
    alignSelf: "center",
    elevation: 4,
    justifyContent: "center",
    padding: 10,
  },
  userAnswer: {
    width: 330,
    height: 130,
    alignSelf: "center",
    elevation: 4,
    justifyContent: "center",
    padding: 10,
  },
  answerText: {
    textAlign: "center",
    fontSize: 30,
    color: "#ffffff",
  },
  buttonsContainer: {
    width: 330,
    alignSelf: "center",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: 160,
    height: 70,
    borderRadius: 10,
    justifyContent: "center",
  },
});
