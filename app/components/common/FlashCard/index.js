import React from "react";
import { View } from "react-native";
import {
  Card,
  Divider,
  IconButton,
  Menu,
  Paragraph,
  Title,
  useTheme,
} from "react-native-paper";

function FlashCard({ id, question, answer, deleteCard }) {
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Card style={{ margin: 10, elevation: 8 }}>
        <Card.Content>
          <Title>{question}</Title>
          <View
            style={{
              position: "absolute",
              left: 300,
            }}
          >
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}
            >
              <Menu.Item
                onPress={() => {
                  deleteCard(id);
                }}
                title="Delete Card"
              />
            </Menu>
          </View>
          <Paragraph>{answer}</Paragraph>
        </Card.Content>
      </Card>
      <Divider />
    </View>
  );
}

export default FlashCard;
