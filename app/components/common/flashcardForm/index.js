import React from "react";
import { Alert, View } from "react-native";
import { TextInput } from "react-native-paper";
import { Formik } from "formik";
import CustomButton from "../CustomButton";

function FlashCardForm({ createFlashcardHandler }) {
  return (
    <View>
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
              style={{
                marginTop: -5,
                padding: 10,
              }}
              placeholder="Enter question"
              onChangeText={props.handleChange("question")}
              value={props.values.question}
              left={<TextInput.Icon name="alpha-q-box" />}
            ></TextInput>
            <TextInput
              mode="outlined"
              label="Flashcard Answer"
              multiline={true}
              numberOfLines={10}
              textAlignVertical="top"
              style={{
                marginTop: -10,
                padding: 10,
              }}
              placeholder="Enter answer"
              onChangeText={props.handleChange("answer")}
              value={props.values.answer}
              left={<TextInput.Icon name="alpha-a-box" />}
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
                  props.values.question !== "" && props.values.answer !== ""
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
    </View>
  );
}

export default FlashCardForm;
