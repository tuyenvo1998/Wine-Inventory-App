import React, { useState, useEffect } from "react";
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
  ScrollView,
} from "react-native";
import { useFormik } from "formik";
import DatePicker from "react-native-neat-date-picker";
import { useNavigation } from "@react-navigation/core";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import firebase from "firebase";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import { Colors } from "../components/styles";

export default function AddBottle(props) {
  const { bottle } = props.route.params;
  const navigation = useNavigation();
  const [checkboxState, setCheckboxState] = useState(false);

  const [isEnabled, setIsEnabled] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState("");

  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (bottle !== null) {
      setFieldValue("region", bottle.region);
      setFieldValue("bottleName", bottle.bottle_name);
      setFieldValue("location", bottle.location);
      setFieldValue("dateOpened", bottle.opened_date);
      setFieldValue("pairings", bottle.pairings.join(","));
      setFieldValue("status", bottle.status);
      setFieldValue("typeOfWine", bottle.type_of_wine);
      setFieldValue("vintage", bottle.vintage);
      setFieldValue("varietals", bottle.varietals);
      setFieldValue("age", bottle.age);
      setFieldValue("country", bottle.country);
      setFieldValue("enjoy", bottle.enjoy);
      setFieldValue("favorite", bottle.favorite);
      setFieldValue("barcode", bottle.barcode);
      setFieldValue("id", Math.random().toString(36).substring(2, 10));
    } else {
      setFieldValue("barcode", "");
      setFieldValue("id", Math.random().toString(36).substring(2, 10));
    }
  }, []);

  useEffect(() => {
    setFieldValue("favorite", checkboxState);
  }, [checkboxState]);

  const { handleChange, handleSubmit, setFieldValue, values } = useFormik({
    initialValues: {
      // TO DO: implement image picker
      bottleName: "",
      typeOfWine: "",
      location: "",
      vintage: "",
      varietals: "", /////
      age: "", //////
      country: "", /////
      region: "",
      pairings: "",
      enjoy: "", ///////,
      favorite: false, /////
      status: false,
      dateOpened: "",
      barcode: "", ///////
      id: "",
    },
    onSubmit: (values) => {
      console.log("*** ADDING BOTTLE ***");
      console.log(`Bottle name: ${values.bottleName}`);
      console.log(`Type of wine: ${values.typeOfWine}`);
      console.log(`Location: ${values.location}`);
      console.log(`Vintage: ${values.vintage}`);
      console.log(`Varietals: ${values.varietals}`);
      console.log(`Age: ${values.age}`);
      console.log(`Country: ${values.country}`);
      console.log(`Region: ${values.region}`);
      console.log(`Pairings: ${values.pairings}`);
      console.log(`Enjoy: ${values.enjoy}`);
      console.log(`Favorite: ${values.favorite}`);
      console.log(`Status: ${values.status}`);
      console.log(`Date opened: ${values.dateOpened}`);
      console.log(`Barcode: ${values.barcode}`);
      console.log(`ID: ${values.id}`);

      let bottle = {
        region: values.region,
        barcode: values.barcode,
        bottle_name: values.bottleName,
        location: values.location,
        opened_date: values.dateOpened,
        pairings: values.pairings.split(","),
        status: values.status ? "Opened" : "Not opened",
        type_of_wine: values.typeOfWine,
        vintage: values.vintage,
        varietals: values.varietals,
        age: values.age,
        country: values.country,
        enjoy: values.enjoy,
        favorite: values.favorite,
        id: values.id,
      };

      firebase
        .database()
        .ref()
        .child("storage")
        .child(firebase.auth().currentUser.uid)
        .child(values.id)
        .set(bottle, (error) => {
          if (error === null) {
            alert("Bottle added!");
            navigation.navigate("Main");
          } else {
            alert("Error, bottle was not added.");
            console.error(error);
          }
        });
    },
  });

  const toggleSwitch = () => {
    if (isEnabled == false) {
      setDate("");
      setFieldValue("date", "");
    }
    setIsEnabled((previousState) => !previousState);
    setFieldValue("status", !isEnabled);
    setShowDatePicker(!isEnabled);
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const onCancel = () => {
    setShowDatePicker(false);
    setIsEnabled(false);
  };

  const onConfirm = (date) => {
    setShowDatePicker(false);
    setShowDate(true);
    var month = date.getMonth() + 1;
    var year = new Date().getFullYear(); // can't get year from this specific date picker
    var d = month + "-" + date.getDate() + "-" + year;
    setDate(d);
    setFieldValue("dateOpened", d);
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={styles.buttonContainer}>
            {/* <Text>{`${wineName} `}</Text> */}
          </View>
          <Text style={styles.title}>Add Bottle</Text>
          <View style={styles.inputContainer}>
            <CustomTextInput
              icon="bottle-wine-outline"
              placeholder={
                values.bottleName === "" ? "Bottle name" : values.bottleName
              }
              onChangeText={handleChange("bottleName")}
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomTextInput
              icon="glass-wine"
              placeholder={
                values.typeOfWine === "" ? "Wine type" : values.typeOfWine
              }
              onChangeText={handleChange("typeOfWine")}
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomTextInput
              icon="file-cabinet"
              placeholder={
                values.location === "" ? "Location" : values.location
              }
              onChangeText={handleChange("location")}
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomTextInput
              icon="fruit-grapes"
              placeholder={
                values.varietals === "" ? "Varietals" : values.varietals
              }
              onChangeText={handleChange("varietals")}
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomTextInput
              icon="calendar-month-outline"
              placeholder={values.age === "" ? "Age" : values.age}
              onChangeText={handleChange("age")}
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomTextInput
              icon="timetable" // TO DO
              placeholder={values.vintage === "" ? "Vintage" : values.vintage}
              onChangeText={handleChange("vintage")}
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomTextInput
              icon="google-maps"
              placeholder={values.country === "" ? "Country" : values.country}
              onChangeText={handleChange("country")}
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomTextInput
              icon="earth"
              placeholder={values.region === "" ? "Region" : values.region}
              onChangeText={handleChange("region")}
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomTextInput
              icon="food-steak"
              placeholder={
                values.pairings === "" ? "Pairing(s)" : values.pairings
              }
              onChangeText={handleChange("pairings")}
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomTextInput
              icon="thermometer"
              placeholder={
                values.enjoy === ""
                  ? "Preferred serving temperature"
                  : values.enjoy
              }
              onChangeText={handleChange("enjoy")}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <BouncyCheckbox
              size={25}
              fillColor={Colors.brand}
              unfillColor="#FFFFFF"
              iconStyle={{ borderColor: Colors.brand }}
              onPress={() => setCheckboxState(!checkboxState)}
            />
            <Text style={styles.text}>Favorite?</Text>
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
    </ScrollView>
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
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignSelf: "flex-start",
    paddingHorizontal: 32,
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

// export default AddBottleScreen;
