import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function CustomButton({ label, onPress }) {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 8,
        height: 50,
        width: 245,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#562B45",
      }}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text
        style={{ fontSize: 18, color: "white", textTransform: "uppercase" }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
