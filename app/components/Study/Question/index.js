import { useNavigation, useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Surface, Text, TextInput } from "react-native-paper";
import { ANSWER } from "../../../constants/routeNames";
import Container from "../../common/Container";
import CustomButton from "../../common/CustomButton";

function QuestionComponent(props) {
  const theme = useTheme();
  const { navigate } = useNavigation();

  return (
    <Container scrollable>
      <Surface
        style={[styles.question, { backgroundColor: theme.colors.primary }]}
      >
        <Text style={styles.questionText}>What is a concrete class?</Text>
      </Surface>
      <Surface style={styles.userAnswer}>
        <TextInput
          theme={{ roundness: 20 }}
          mode="flat"
          label="Answer"
          style={styles.userAnswerTextInput}
          left={
            <TextInput.Icon
              name="alpha-a-box-outline"
              color={true ? theme.colors.primary : theme.colors.text}
            />
          }
        ></TextInput>
      </Surface>
      <View style={{ alignItems: "flex-end" }}>
        <CustomButton
          title="Submit"
          width={165}
          onPress={() => navigate(ANSWER)}
        ></CustomButton>
      </View>
    </Container>
  );
}

export default QuestionComponent;

const styles = StyleSheet.create({
  question: {
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
  },
  questionText: {
    textAlign: "center",
    fontSize: 30,
    color: "#ffffff",
  },
  userAnswerTextInput: { width: 310, alignSelf: "center" },
});
