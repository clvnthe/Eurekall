import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";

import colors from "../../../../assets/theme/colors";
import styles from "./styles";

function CustomButton({
  title,
  primary,
  secondary,
  danger,
  loading,
  disabled,
  onPress,
  bgColor,
  width,
}) {
  const theme = useTheme();
  const getBgColor = () => {
    if (disabled) {
      return colors.grey;
    }
    if (primary) {
      return colors.primary;
    }
    if (danger) {
      return colors.danger;
    }
    if (secondary) {
      return colors.secondary;
    }
  };
  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[
          styles.wrapper,
          { width: width },
          { backgroundColor: bgColor ? bgColor : theme.colors.primary },
        ]}
      >
        <View style={styles.loadingSection}>
          {loading && <ActivityIndicator color={colors.primary} />}
          {title && (
            <Text
              style={{
                color: theme.dark ? theme.colors.onPrimary : "#ffffff",
                paddingLeft: loading ? 5 : 0,
              }}
            >
              {title}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default CustomButton;
