import React from "react";
import { Text, TextInput, View } from "react-native";
import colors from "../../../../assets/theme/colors";

import styles from "./styles";

function Input({
  onChangeText,
  style,
  value,
  label,
  placeholder,
  showHide,
  icon,
  iconPosition,
  error,
  ...props
}) {
  const getFlexDirection = () => {
    if (iconPosition === "left") {
      return "row";
    } else {
      return "row-reverse";
    }
  };

  const getBorderColor = () => {
    if (error) {
      return colors.danger;
    } else if (focused) {
      return colors.primary;
    } else {
      return colors.grey;
    }
  };
  const [focused, setFocused] = React.useState(false);

  return (
    <View style={styles.inputContainer}>
      {label && <Text style={{ fontWeight: "bold" }}>{label}</Text>}
      <View
        style={[
          styles.wrapper,
          { flexDirection: getFlexDirection(), borderColor: getBorderColor() },
        ]}
      >
        <View>{icon && icon}</View>
        <TextInput
          style={[styles.textInput, style]}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          secureTextEntry={showHide ? true : false}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          {...props}
        ></TextInput>
      </View>
      <View>{error && <Text style={styles.error}>{error}</Text>}</View>
    </View>
  );
}

export default Input;
