import React from "react";
import { Alert, ScrollView, View } from "react-native";
import { TextInput } from "react-native-paper";
import { Formik } from "formik";
import CustomButton from "../CustomButton";

function FlashCardForm({ createFlashcardHandler }) {
  return (
    <ScrollView>
      <Formik
        initialValues={{ question: "", answer: "" }}
        onSubmit={(values, actions) => {
          actions.resetForm();
          createFlashcardHandler(values.question, values.answer);
        }}
      >
        {(props) => (
          <View>
            <TextInput
              mode="outlined"
              label="Flashcard Question"
              multiline={true}
              numberOfLines={10}
              maxLength={100}
              style={{
                maxHeight: 150,
                marginTop: -5,
                padding: 10,
              }}
              placeholder="Enter question"
              onChangeText={props.handleChange("question")}
              value={props.values.question}
              left={<TextInput.Icon name="alpha-q-box" />}
              right={
                <TextInput.Affix
                  text={props.values.question.trim().length + "/100"}
                />
              }
            ></TextInput>
            <TextInput
              mode="outlined"
              label="Flashcard Answer"
              multiline={true}
              numberOfLines={10}
              maxLength={500}
              textAlignVertical="top"
              style={{
                maxHeight: 200,
                marginTop: -10,
                padding: 10,
              }}
              placeholder="Enter answer"
              onChangeText={props.handleChange("answer")}
              value={props.values.answer}
              left={<TextInput.Icon name="alpha-a-box" />}
              right={
                <TextInput.Affix
                  text={props.values.answer.trim().length + "/500"}
                />
              }
            ></TextInput>
            <View
              style={{
                alignSelf: "center",
              }}
            >
              <CustomButton
                title="Submit"
                bgColor="#28A44B"
                width={310}
                onPress={
                  props.values.question.trim() !== "" &&
                  props.values.answer.trim() !== ""
                    ? props.handleSubmit
                    : () =>
                        Alert.alert("Alert", "Fields cannot be empty!", [
                          {
                            text: "OK",
                            onPress: () => console.log("OK Pressed"),
                          },
                        ])
                }
              ></CustomButton>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

export default FlashCardForm;
