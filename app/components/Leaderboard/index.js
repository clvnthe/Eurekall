import { useTheme } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";

function LeaderboardComponent(props) {
  const theme = useTheme();

  return (
    <View style={{ height: "100%", justifyContent: "center" }}>
      <Text style={{ textAlign: "center", color: theme.colors.text }}>
        Leaderboard Screen
      </Text>
    </View>
  );
}

export default LeaderboardComponent;
