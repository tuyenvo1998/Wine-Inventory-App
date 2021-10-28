import React, { useContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';
import {
  Avatar,
  WelcomeImage,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  InnerContainer,
  WelcomeContainer,
  ButtonText,
  Line,
} from './../components/styles';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from './../components/CredentialsContext';

const Welcome = (props) => {
  // credentials context
  const {photoURL, displayName, email} = props.user
  const AvatarImg = photoURL
    ? {
        uri: photoURL,
      }
    : require('./../assets/wine_bottle_2.png');

  const clearLogin = () => {
    /*AsyncStorage.removeItem('flowerCribCredentials')
      .then(() => {
        setStoredCredentials("");
      })
      .catch((error) => console.log(error));*/
      firebase.auth().signOut()
  };

  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeImage resizeMode="cover" source={require('./../assets/wine_bottle_2.png')} />

        <WelcomeContainer>
          <PageTitle welcome={true}>Welcome! Buddy</PageTitle>
          <SubTitle welcome={true}>{displayName || '<unknown name>'}</SubTitle>
          <SubTitle welcome={true}>{email || '<unkown email address>'}</SubTitle>

          <StyledFormArea>
            <Avatar resizeMode="cover" source={AvatarImg} />

            <Line />
            <StyledButton onPress={clearLogin}>
              <ButtonText>Logout</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Welcome;