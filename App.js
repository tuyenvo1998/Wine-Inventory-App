import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import TestingScreen from './screens/TestingScreen';
import MainScreen from './screens/MainScreen';
import DetailScreen from './screens/DetailScreen';
import BarcodeScanner from "./screens/BarcodeScanner";
import AddBottleScreen from "./screens/AddBottleScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        {/* options={{ headerShown: false }}  USE THIS TO HIDE NAVIGATION HEADER */}
        <Stack.Screen options={{ headerShown: false }, {}} name="Login" component={LoginScreen} /> 
        {/*<Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />*/}
        <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen} />
        {/*<Stack.Screen options={{ headerShown: false }} name="Welcome" component={WelcomeScreen} />*/}
        <Stack.Screen options={{ headerShown: true, headerTransparent: true, headerTitle: '' }} name="Home" component={MainScreen} />
        <Stack.Screen options={{ headerShown: true, headerTransparent: true, headerTitle: '' }} name="Bottle Detail" component={DetailScreen}/>
        <Stack.Screen name="BarcodeScanner" options={{ title: 'Scan', headerTransparent: true, headerTitle: 'Scan', headerTintColor: 'white'}} component={BarcodeScanner} />
        <Stack.Screen
          options={{ title: "" ,headerShown: true, headerTransparent: true, headerTitle: '' }}
          name="AddBottleScreen"
          component={AddBottleScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
