import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';

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
} from '../components/styles';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from '../components/CredentialsContext';

const Welcome = () => {
  // credentials context
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  const { name, email, photoUrl } = storedCredentials;

  const AvatarImg = photoUrl
    ? {
        uri: photoUrl,
      }
    : require('./../assets/wine_bottle_2.png');

  const clearLogin = () => {
    AsyncStorage.removeItem('flowerCribCredentials')
      .then(() => {
        setStoredCredentials("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
    <ImageBackground source={require('./../assets/background.jpg')} style={styles.background}>
        <StatusBar style="light" />
        <InnerContainer>
          <WelcomeImage resizeMode="cover" source={require('./../assets/wine_bottle_2.png')} />

          <WelcomeContainer>
            <StyledFormArea>
              <Avatar resizeMode="cover" source={AvatarImg} />
              <Line />
              <StyledButton onPress={clearLogin}>
                <ButtonText>Logout</ButtonText>
              </StyledButton>
            </StyledFormArea>
          </WelcomeContainer>
        </InnerContainer>
      </ImageBackground>
    </>
  );
};

export default Welcome;