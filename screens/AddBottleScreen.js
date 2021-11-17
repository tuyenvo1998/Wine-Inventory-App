import React, { useState } from "react";
import {
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  TextInput,
  Switch,
  TouchableOpacity,
  Button,
} from "react-native";
import { useFormik } from "formik";

import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import { Colors } from "../components/styles";

export default function AddBottle() {
  const [status, setStatus] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    setStatus(isEnabled); // this shouldn't work but it does somehow for having status be correct
    // console.log("isEnabled: " + isEnabled);
    // console.log("Status: " + status);
    // print();
  };
  const print = () => {
    // console.log("- isEnabled: " + isEnabled);
    // console.log("- Status: " + status);
    // console.log("\n");
  };

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      bottleName: "",
      typeOfWine: "",
      location: "",
      status: false,
      dateOpened: "",
    },
    onSubmit: (values) =>
      alert(
        `Bottle name: ${values.bottleName}, Type of wine: ${values.typeOfWine}, Location: ${values.location}`
      ),
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={styles.title}>Add Bottle</Text>
        <View style={styles.inputContainer}>
          <CustomTextInput
            icon="bottle-wine-outline"
            placeholder="Bottle name"
            onChangeText={handleChange("bottleName")}
          />
        </View>
        <View style={styles.inputContainer}>
          <CustomTextInput
            icon="glass-wine"
            placeholder="Wine type"
            onChangeText={handleChange("typeOfWine")}
          />
        </View>
        <View style={styles.inputContainer}>
          <CustomTextInput
            icon="file-cabinet"
            placeholder="Location"
            onChangeText={handleChange("location")}
          />
        </View>
        <View style={styles.switchContainer}>
          <Switch
            trackColor={{ false: Colors.primary, true: Colors.brand }}
            thumbColor={isEnabled ? Colors.primary : Colors.primary}
            ios_backgroundColor={Colors.darkLight}
            onChange={toggleSwitch}
            value={isEnabled}
          />
          <Text style={styles.text}>Opened?</Text>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton label="Add" onPress={handleSubmit} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: 48,
    width: 325,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#223e4b",
    borderWidth: StyleSheet.hairlineWidth,
    padding: 8,
  },
  buttonContainer: {
    padding: 7,
  },
  buttonText: {
    fontSize: 18,
    color: "#562B45",
  },
  inputContainer: {
    paddingHorizontal: 32,
    marginBottom: 16,
    width: "100%",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "flex-start",
    alignItems: "center",
    paddingHorizontal: 32,
    marginBottom: 16,
  },
  text: {
    color: "rgba(34, 62, 75, 0.7)",
    padding: 10,
  },
  title: {
    color: "#223e4b",
    fontSize: 20,
    marginBottom: 16,
  },
});
