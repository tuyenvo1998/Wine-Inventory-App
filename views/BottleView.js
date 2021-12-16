import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import firebase from "firebase";

const styles = StyleSheet.create({
  root: {
    backgroundColor: "rgb(242,242,242)",
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  row: { flexDirection: "row" },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: 80, height: 80 },
  content: {
    padding: 12,
    flexShrink: 1,
    borderLeftColor: "lightgray",
    borderLeftWidth: 0.4,
    width: "100%",
  },
  nameContainer: {
    flexDirection: "column",
    flexShrink: 1,
  },
  name: {
    flex: 1,
    flexWrap: "wrap",
    color: "black",
    fontSize: 18,
    fontWeight: "300",
    fontVariant: ["small-caps"],
  },
  detail: {
    color: "black",
    fontSize: 14,
    textTransform: "capitalize",
  },
  status: {
    textAlign: "right",
  },
});

const BottleView = (props) => {
  const navigation = useNavigation();
  const [bottleImage, setBottleImage] = useState(null);
  useEffect(() => {
    if (!props.bottle.image) return;
    else if (props.bottle.image.startsWith("storage://"))
      firebase
        .storage()
        .ref()
        .child(props.bottle.image.substr(10))
        .getDownloadURL()
        .then((url) => setBottleImage(url));
    else setBottleImage(props.bottle.image);
  });
  return (
    <TouchableOpacity
      style={styles.root}
      onPress={() =>
        navigation.navigate("Bottle Detail", { id: props.bottle.id })
      }
    >
      <View style={styles.row}>
        <View style={styles.imageContainer}>
          <Image
            source={
              bottleImage
                ? { uri: bottleImage }
                : require("../assets/wine_bottle_2.webp")
            }
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.content}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{props.bottle.bottle_name}</Text>
          </View>
          <Text style={styles.detail}>
            {props.bottle.type_of_wine || "Unknown Type"}
          </Text>
          <Text style={styles.detail}>{props.bottle.vintage} Vintage</Text>
          <Text style={[styles.detail, styles.status]}>
            {props.bottle.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BottleView;
