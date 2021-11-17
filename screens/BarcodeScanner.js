import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Pressable,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Colors } from "./../components/styles";
import { useNavigation } from "@react-navigation/core";

const BarcodeScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeText, setBarcodeText] = useState("Not yet scanned");
  const [wineText, setWineText] = useState("");
  const navigation = useNavigation();

  // Request camera permission
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the barcode
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setBarcodeText(data);
    console.log("Type " + type + "\nData: " + data);
  };

  // Check permissions and return the screens     temp screen when user hasn't given permission
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission.</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera.</Text>
        {/* <Pressable style={styles.button} onPress={() => askForCameraPermission()}>
          <Text>Allow Camera</Text>
        </Pressable> */}
        <Button
          style={styles.button}
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.containerScreen}>
        <View>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 250, width: 350 }}
          />
        </View>
        {!scanned && (
          <View style={styles.containerText}>
            <Text style={styles.mainText}>Not yet scanned</Text>
          </View>
        )}
        {scanned && (
          <View style={{ alignItems: "center" }}>
            <View style={styles.containerText}>
              <Text style={styles.mainText}>Barcode: {barcodeText}</Text>
              <Text style={styles.mainText}>Wine: Castello del Poggio</Text>
            </View>
            <View
              style={{
                marginTop: 20,
                borderRadius: 5,
              }}
            >
              <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                  <Button
                    title={"Scan Again"}
                    onPress={() => setScanned(false)}
                    color="#fff"
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    title={"Add Bottle"}
                    onPress={() => navigation.navigate("AddBottleScreen")}
                    color="#fff"
                  />
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: "#562B45",
    borderRadius: 15,
    marginVertical: 5,
    height: 60,
    width: 60,
    // left: 90px,
  },
  buttonContainer: {
    backgroundColor: Colors.brand,
    alignSelf: "flex-start",
    margin: 10,
  },
  buttonsContainer: {
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: Colors.darkLight,
    // borderColor: 'skyblue',
    // borderWidth: 10,
  },

  containerScreen: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: 30,
    // borderColor: 'purple',
    // borderWidth: 10,
  },

  containerText: {
    marginTop: 30,
    padding: 10,
    borderRadius: 5,
    // borderColor: 'green',
    // borderWidth: 10,
  },

  mainText: {
    fontSize: 18,
    color: Colors.primary,
  },
});

export default BarcodeScanner;
