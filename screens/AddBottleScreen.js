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
  KeyboardAvoidingView,
  Image,
} from "react-native";
import ImageUploader from '../util/ImageUploader'
import { useFormik } from "formik";
import DatePicker from "react-native-neat-date-picker";
import { useNavigation } from "@react-navigation/core";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import { IconButton } from "react-native-paper";

import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import { Colors } from "../components/styles";

export default function AddBottle(props) {
  const { bottle } = props.route.params;
  const navigation = useNavigation();
  const [checkboxState, setCheckboxState] = useState(false);
  const [hasImage, setHasImage] = useState(false);

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
      setFieldValue("image", bottle.image);
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
      varietals: "",
      age: "",
      country: "",
      region: "",
      pairings: "",
      enjoy: "",
      favorite: false,
      status: false,
      dateOpened: "",
      imageUri: "",
      barcode: "",
      id: "",
    },
    onSubmit: async (values) => {
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
      // console.log(`Image URI: ${values.imageUri}`);  //TO DO: add image
      console.log(`Barcode: ${values.barcode}`);
      console.log(`ID: ${values.id}`);

      /* Uploading image */                      /*Image URI from picker*/
      let storageUri = await ImageUploader.upload(values.image, values.id)

      let newBottle = {
        region: values.region,
        barcode: values.barcode,
        bottle_name: values.bottleName,
        location: values.location,
        opened_date: values.status === "Opened" ? values.dateOpened : "",
        pairings: values.pairings.split(","),
        status: values.status ? "Opened" : "Not opened",
        type_of_wine: values.typeOfWine,
        image: storageUri,
        vintage: values.vintage,
        varietals: values.varietals,
        age: values.age,
        country: values.country,
        enjoy: values.enjoy,
        favorite: values.favorite,
        id: values.id,
        // image: values.imageUri,  //TO DO: add image
      };

      firebase
        .database()
        .ref()
        .child("storage")
        .child(firebase.auth().currentUser.uid)
        .child(values.id)
        .set(newBottle, (error) => {
          if (error === null) {
            alert("Bottle added!");
            navigation.navigate("Home");
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

  let pickerResult = null;
  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
    setHasImage(true);

    /* CALL UPLOAD HERE */
    // setFieldValue("imageUri", pickerResult.uri);   // set the image for formik
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
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
              <View style={styles.imageContainer}>
                <IconButton
                  icon="camera"
                  color={Colors.brand}
                  size={20}
                  onPress={() => openImagePickerAsync()}
                />
              </View>
            </View>
            {/* TO DO: IMAGE PICKER */}
            <Image source={{ uri: values.imageUri }} />
            <Text style={styles.text}> Image: {values.imageUri}</Text>
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
      </KeyboardAvoidingView>
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignSelf: "flex-start",
    paddingHorizontal: 32,
    width: "100%",
    // borderWidth: 5,
    // borderColor: "pink",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginLeft: 125,
    // borderWidth: 5,
    // borderColor: "green",
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
    alignSelf: "center",
  },
  textDate: {
    color: Colors.brand,
    padding: 10,
  },
  title: {
    color: "#223e4b",
    fontSize: 20,
    marginBottom: 16,
    paddingTop: 16,
  },
});

// export default AddBottleScreen;
