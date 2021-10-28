import React, { useEffect, useState } from 'react';

// React navigation stack
import RootStack from './navigators/RootStack';

import firebase from 'firebase'

// apploading
import AppLoading from 'expo-app-loading';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from './components/CredentialsContext';
import initializeFirebase from './firebase.init';
initializeFirebase()

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setAppReady(true)
      setStoredCredentials(user)
    })
  })

  /*const checkLoginCredentials = () => {
    AsyncStorage.getItem('flowerCribCredentials')
      .then((result) => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
        } else {
          setStoredCredentials(null);
        }
      })
      .catch((error) => console.log(error));
  };*/

  if (!appReady) {
    return <AppLoading onFinish={() => setAppReady(true)} onError={console.warn} />;
  }

  return (
      <RootStack user={storedCredentials} />
  );
}