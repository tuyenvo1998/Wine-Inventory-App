import React, { useState, useContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as GoogleAuthentication from 'expo-google-app-auth'
import firebase from 'firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';

const signInWithGoogle = () => GoogleAuthentication.logInAsync({
  androidClientId:  '782673045288-sr5a518k6iuig07olj9hu7i1o8jmq71i.apps.googleusercontent.com',
  iosClientId:      '782673045288-3m20vets1bcm0afp6b59voi6a668kqma.apps.googleusercontent.com',
  scopes: ['profile', 'email']
}).then(result => {
  if (result.type === 'success') {
    const {idToken, accessToken} = result;
    const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken)
    return firebase.auth().signInWithCredential(credential).then(r => r.user)
  }
  return Promise.reject()
}).catch(() => console.error("Sign in with Google cancelled."))

// formik
import { Formik } from 'formik';

import {
  StyledContainer,
  PageLogo,
  PageTitle,
  PageTitle_1,
  SubTitle,
  StyledInputLabel,
  StyledFormArea,
  StyledButton,
  StyledTextInput,
  LeftIcon,
  RightIcon,
  InnerContainer,
  ButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  Colors,
} from './../components/styles';
import { View, ActivityIndicator } from 'react-native';

//colors
const { darkLight, brand, primary } = Colors;

// icon
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';

// keyboard avoiding view
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';

// api client
import axios from 'axios';

// Google Signin
// import * as Google from 'expo-google-app-auth'; ======

// Async storage
// import AsyncStorage from '@react-native-async-storage/async-storage'; 

// credentials context
import { CredentialsContext } from './../components/CredentialsContext'; 

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  // credentials context
  // const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);

  const handleLogin = (credentials, setSubmitting) => {
    handleMessage(null);
    firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
    /*const url = 'https://whispering-headland-00232.herokuapp.com/user/signin';
    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { status, message, data } = result;

        if (status !== 'SUCCESS') {
          handleMessage(message, status);
        } else {
          persistLogin({ ...data[0] }, message, status);
        }
        setSubmitting(false);
      })
      .catch((error) => {
        setSubmitting(false);
        handleMessage('An error occurred. Check your network and try again');
        console.log(error.toJSON());
      });*/

  };

  const handleMessage = (message, type = '') => {
    setMessage(message);
    setMessageType(type);
  };

  const handleGoogleSignin = () => {
    
    /*setGoogleSubmitting(true);
    const config = {
      iosClientId: `782607156495-2de6ecovh62rsu1ec5cduv9li7g33ki3.apps.googleusercontent.com`,
      androidClientId: `782607156495-t08mgso56tjsp7und7lf81b2bmis239f.apps.googleusercontent.com`,
      scopes: ['profile', 'email'],
    };
    Google.logInAsync(config)
      .then((result) => {
        const { type, user } = result;
        if (type == 'success') {
          const { email, name, photoUrl } = user;
          persistLogin({ email, name, photoUrl }, 'Google signin successful', 'SUCCESS');
        } else {
          handleMessage('Google Signin was cancelled');
        }
        setGoogleSubmitting(false);
      })
      .catch((error) => {
        handleMessage('An error occurred. Check your network and try again');
        console.log(error);
        setGoogleSubmitting(false);
      });*/
      setGoogleSubmitting(true);
      signInWithGoogle().then(r => {setGoogleSubmitting(false); persistLogin({...r}, 'Google signin successful', "SUCCESS")})
  };

  // Persisting login
  const persistLogin = (credentials, message, status) => {
    AsyncStorage.setItem('flowerCribCredentials', JSON.stringify(credentials))
      .then(() => {
        handleMessage(message, status);
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        handleMessage('Persisting login failed');
        console.log(error);
      });
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo resizeMode="cover" source={require('./../assets/wine_bottle_2.png')} />
          <SubTitle>Account Login</SubTitle>

          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.email == '' || values.password == '') {
                handleMessage('Please fill in all fields');
                setSubmitting(false);
              } else {
                handleLogin(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Email Address"
                  placeholder="abc@gmail.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                  icon="mail"
                />
                <MyTextInput
                  label="Password"
                  placeholder="* * * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  icon="lock"
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox type={messageType}>{message}</MsgBox>

                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Login</ButtonText>
                  </StyledButton>
                )}
                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}

                <Line />

                {!googleSubmitting && (
                  <StyledButton onPress={handleGoogleSignin} google={true}>
                    <Fontisto name="google" size={25} color={primary} />
                    <ButtonText google={true}>Sign in with Google</ButtonText>
                  </StyledButton>
                )}
                {googleSubmitting && (
                  <StyledButton disabled={true} google={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}

                <ExtraView>
                  <ExtraText>Don't have an account? </ExtraText>
                  <TextLink onPress={() => navigation.navigate('Signup')}>
                    <TextLinkContent>Signup</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon
          onPress={() => {
            setHidePassword(!hidePassword);
          }}
        >
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;