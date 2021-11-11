import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState, useContext } from 'react'
import { ImageBackground, ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { auth } from '../firebase'
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
import { CredentialsContext } from './../components/CredentialsContext'; 
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';
// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import * as Google from 'expo-google-app-auth';
import { Formik } from 'formik';
const { darkLight, brand, primary } = Colors;
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState();;
  const [messageType, setMessageType] = useState();
  const navigation = useNavigation();
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Main")
      }
    })
    return unsubscribe
  }, [])

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      })
      .catch(error => alert(error.message))
  }
  const handleMessage = (message, type = '') => {
    setMessage(message);
    setMessageType(type);
  };

  const handleGoogleSignin = () => {
    setGoogleSubmitting(true);
    const config = {
      iosClientId: `755948651130-84bgj33ka7ckni5jm3ljpp0g66jemvgl.apps.googleusercontent.com`,
      androidClientId: `755948651130-793a4pr3qrbigsgdruolh4cbvclslver.apps.googleusercontent.com`,
      scopes: ['profile', 'email'],
    };
    Google.logInAsync(config)
      .then((result) => {
        const { type, user } = result;
        if (type == 'success') {
          const { email, name, photoUrl } = user;
          persistLogin({ email, name, photoUrl }, 'Signed in With Google Successfully', 'SUCCESS');
          setTimeout(() => navigation.navigate('Home', {email, name, photoUrl}), 1000); //=========
        } 
        else 
        {
          handleMessage('Google Signin was cancelled');
        }
        setGoogleSubmitting(false);
      })
      .catch((error) => {
        handleMessage('An error has occurred. Please check your network and try again.');
        console.log(error);
        setGoogleSubmitting(false);
    });
    
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

    
  };


  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
        
      })
      .catch(error => alert(error.message)) 
  };
  //<KeyboardAvoidingView style={styles.container}>
  //<KeyboardAvoidingView style={styles.container} behavior = "padding">
  return (
    <ImageBackground source={require('./../assets/background.jpg')} style={styles.background}>
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss(); // to make the keyboard dissapear when touch the main screen
      }}>
        <KeyboardAvoidingView style={styles.container}>
          <View style={styles.inputContainer}>
          <PageLogo resizeMode="cover" source={require('./../assets/wine_bottle_2.png')} />
          <SubTitle>Account Login</SubTitle>
            <TextInput
              placeholder="Email Address"
              value={email}
              onChangeText={text => setEmail(text)}
              keyboardType="email-address"
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={text => setPassword(text)}
              style={styles.input}
              secureTextEntry
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.button_1}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
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
                    <Line style={styles.line_spacer} />
                    <ExtraText >Don't have an account? Sign in with</ExtraText>

                    {!googleSubmitting && (
                      <StyledButton onPress={handleGoogleSignin} google={true}>
                        <Fontisto name = "google" size={30} color={primary} />
                        <ButtonText google={true}></ButtonText>
                      </StyledButton>
                    )}
                    {googleSubmitting && (
                      <StyledButton disabled={true} google={true}>
                        <ActivityIndicator size="large" color={primary} />
                      </StyledButton>
                    )}
                  </StyledFormArea>
                )}
              </Formik>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line_spacer: {
    borderBottomColor: 'blue',
    borderBottomWidth: 1,
    marginTop: 15,
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 15,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15, // space from password input and Login button
  },
  button: {
    backgroundColor: '#562B45',
    height: 50,
    width: 200,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 5, // Space between two buttons
  },
  button_1: {
    backgroundColor: '#562B45',
    height: 50,
    width: 200,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 5, // Space between two buttons
    marginBottom: 130,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  text_center: {
    alignItems: 'center',
  }
})
