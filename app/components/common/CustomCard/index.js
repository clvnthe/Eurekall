import React from "react";
import { View } from "react-native";
import {
  Button,
  Card,
  Divider,
  Paragraph,
  Title,
  useTheme,
} from "react-native-paper";

function CustomCard({ title, subtitle, LeftContent, body, deleteCard, id }) {
  const theme = useTheme();

  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Card style={{ margin: 10, elevation: 1 }}>
        <Card.Title title={title} subtitle={subtitle} left={LeftContent} />
        <Card.Content>
          <Title>{title}</Title>
          <Paragraph>{body}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => console.log("Opening")}>Open</Button>
          <Button
            onPress={() => {
              deleteCard(id);
            }}
          >
            Delete
          </Button>
        </Card.Actions>
      </Card>
      <Divider />
    </View>
  );
}

export default CustomCard;
