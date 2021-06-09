import { useTheme } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";

function SettingsComponent(props) {
  const theme = useTheme();

  return (
    <View style={{ height: "100%", justifyContent: "center" }}>
      <Text style={{ textAlign: "center", color: theme.colors.text }}>
        Settings Page
      </Text>
    </View>
  );
}

export default SettingsComponent;
