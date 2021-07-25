import React from "react";
import { Alert, View } from "react-native";
import { TextInput, Text, useTheme } from "react-native-paper";
import { Formik } from "formik";
import CustomButton from "../CustomButton";

function ReviewFormComponent({
  createDeckHandler,
  autoGeneratorUI,
  createMlDeckHandler,
}) {
  return (
    <View style={{ elevation: 24 }}>
      <Formik
        initialValues={{
          title: "",
          subtitle: "",
          paragraph: "",
        }}
        onSubmit={(values, actions) => {
          actions.resetForm();
          autoGeneratorUI
            ? createMlDeckHandler(
                values.title,
                values.subtitle,
                values.paragraph
              )
            : createDeckHandler(values.title, values.subtitle);
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
            {autoGeneratorUI && (
              <TextInput
                mode="outlined"
                label="Your paragraph"
                maxLength={256}
                style={{
                  marginTop: -10,
                  padding: 10,
                }}
                placeholder="Enter your paragraph"
                onChangeText={props.handleChange("paragraph")}
                value={props.values.paragraph}
                left={<TextInput.Icon name="note-text" />}
                right={
                  <TextInput.Affix
                    text={props.values.paragraph.trim().length + "/256"}
                  />
                }
              />
            )}
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
                  autoGeneratorUI
                    ? props.values.title !== "" &&
                      props.values.subtitle !== "" &&
                      props.values.paragraph !== ""
                      ? props.handleSubmit
                      : () =>
                          Alert.alert("Alert", "Fields cannot be empty!", [
                            {
                              text: "OK",
                              onPress: () => console.log("OK Pressed"),
                            },
                          ])
                    : props.values.title !== "" && props.values.subtitle !== ""
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
