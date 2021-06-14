import React from "react";
import { Alert, View } from "react-native";
import { TextInput, Text, useTheme } from "react-native-paper";
import { Formik } from "formik";
import CustomButton from "../CustomButton";

function ReviewFormComponent({ createDeckHandler }) {
  return (
    <View>
      <Formik
        initialValues={{
          title: "",
          subtitle: "",
        }}
        onSubmit={(values, actions) => {
          actions.resetForm();
          createDeckHandler(values.title, values.subtitle);
        }}
      >
        {(props) => (
          <View>
            <TextInput
              mode="outlined"
              label="Deck Title"
              style={{
                marginTop: -5,
                padding: 10,
              }}
              placeholder="Enter deck title"
              onChangeText={props.handleChange("title")}
              value={props.values.title}
              left={<TextInput.Icon name="format-title" />}
            ></TextInput>
            <TextInput
              mode="outlined"
              label="Deck Subtitle"
              style={{
                marginTop: -10,
                padding: 10,
              }}
              placeholder="Enter deck subtitle"
              onChangeText={props.handleChange("subtitle")}
              value={props.values.subtitle}
              left={<TextInput.Icon name="subtitles" />}
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
                  props.values.title !== "" && props.values.subtitle !== ""
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

export default ReviewFormComponent;
