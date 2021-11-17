import React from "react";
import { TextInput as RNTextInput, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons as MCI } from "@expo/vector-icons";

export default function CustomTextInput({ icon, ...otherProps }) {
  const validationColor = "#223e4b";
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: 48,
        borderRadius: 8,
        borderColor: validationColor,
        borderWidth: StyleSheet.hairlineWidth,
        padding: 8,
      }}
    >
      <View style={{ padding: 8 }}>
        <MCI name={icon} color={validationColor} size={16} />
      </View>
      <View style={{ flex: 1 }}>
        <RNTextInput
          underlineColorAndroid="transparent"
          placeholderTextColor="rgba(34, 62, 75, 0.7)"
          {...otherProps}
        />
      </View>
    </View>
  );
}
