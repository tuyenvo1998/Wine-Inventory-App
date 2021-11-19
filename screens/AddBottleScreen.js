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
import DatePicker from "react-native-neat-date-picker";

import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import { Colors } from "../components/styles";

export default function AddBottle() {
  const { handleChange, handleSubmit, setFieldValue, values } = useFormik({
    initialValues: {
      bottleName: "",
      typeOfWine: "",
      location: "",
      vintage: "",
      region: "",
      pairings: "",
      status: false,
      dateOpened: "",
    },
    onSubmit: (values) => {
      console.log(`Bottle name: ${values.bottleName}`);
      console.log(`Type of wine: ${values.typeOfWine}`);
      console.log(`Location: ${values.location}`);
      console.log(`Vintage: ${values.vintage}`);
      console.log(`Region: ${values.region}`);
      console.log(`Pairings: ${values.pairings}`);
      console.log(`Status: ${values.status}`);
      console.log(`Date opened: ${values.dateOpened}`);
      alert("Bottle added!");
    },
  });
  const [isEnabled, setIsEnabled] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState("");

  const toggleSwitch = () => {
    if (isEnabled == false) {
      setDate("");
      setFieldValue("date", "");
    }
    setIsEnabled((previousState) => !previousState);
    setFieldValue("status", !isEnabled);
    setShowDatePicker(!isEnabled);
  };

  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [showDatePicker, setShowDatePicker] = useState(false);
  const openDatePicker = () => {
    setShowDatePicker(true);
  };
  const onCancel = () => {
    setShowDatePicker(false);
    setIsEnabled(false);
  };
  const onConfirm = (date) => {
    setShowDatePicker(false);
    var month = months[date.getMonth()];
    var year = new Date().getFullYear(); // can't get year from this specific date picker
    setDate(month + " " + date.getDate() + ", " + year);
    setFieldValue("dateOpened", date);
    setShowDate(true);
  };

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
        <View style={styles.inputContainer}>
          <CustomTextInput
            icon="fruit-grapes"
            placeholder="Vintage"
            onChangeText={handleChange("vintage")}
          />
        </View>
        <View style={styles.inputContainer}>
          <CustomTextInput
            icon="earth"
            placeholder="Region"
            onChangeText={handleChange("region")}
          />
        </View>
        <View style={styles.inputContainer}>
          <CustomTextInput
            icon="food-steak"
            placeholder="Pairing(s)"
            onChangeText={handleChange("pairings")}
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
          {showDate && isEnabled && (
            <TouchableOpacity onPress={openDatePicker}>
              <Text style={styles.textDate}>{date}</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.inputContainer}>
          <DatePicker
            isVisible={showDatePicker}
            mode={"single"}
            colorOptions={datePickerColors}
            onCancel={onCancel}
            onConfirm={onConfirm}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton label="Add" onPress={handleSubmit} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const datePickerColors = {
  headerColor: Colors.darkLight,
  backgroundColor: Colors.primary,
  selectedDateBackgroundColor: Colors.darkLight,
  weekDaysColor: Colors.tertiary,
  dateTextColor: Colors.tertiary,
  changeYearModalColor: Colors.tertiary,
  confirmButtonColor: Colors.darkLight,
};

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
  textDate: {
    color: Colors.brand,
    padding: 10,
  },
  title: {
    color: "#223e4b",
    fontSize: 20,
    marginBottom: 16,
  },
});
