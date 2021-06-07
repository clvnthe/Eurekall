import React from "react";
import { View } from "react-native";
import { TextInput, Text, useTheme } from "react-native-paper";
import { Formik } from "formik";
import CustomButton from "../CustomButton";
import colors from "../../../../assets/theme/colors";

function ReviewFormComponent({ addCard }) {
  return (
    <View>
      <Formik
        initialValues={{ title: "", subtitle: "", body: "" }}
        onSubmit={(values, actions) => {
          actions.resetForm();
          addCard(values);
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
            <TextInput
              mode="outlined"
              label="Deck Content"
              multiline
              style={{
                height: 200,
                marginTop: -10,
                padding: 10,
              }}
              placeholder="Enter deck content"
              onChangeText={props.handleChange("body")}
              value={props.values.body}
              left={<TextInput.Icon name="lead-pencil" />}
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
                onPress={props.handleSubmit}
              ></CustomButton>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

export default ReviewFormComponent;
