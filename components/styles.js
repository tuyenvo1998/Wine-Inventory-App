import styled from 'styled-components';
import { View, Text, TouchableOpacity, TextInput, Image, ImageBackground } from 'react-native';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;

// colors
export const Colors = {
  primary: '#ffffff',
  secondary: '#E5E7EB',
  tertiary: '#1F2937',
  darkLight: '#9CA3AF',
  brand: '#562B45',
  green: '#10B981',
  red: '#EF4444',
};

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;

export const StyledContainer = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: ${StatusBarHeight + 30}px;
  
`;


export const InnerContainer = styled.View`
  width: 100%;
  flex: 1;
  align-items: center;
`;

export const WelcomeContainer = styled(InnerContainer)`
  padding: 25px;
  padding-top: 10px;
  justify-content: center;
`;

export const PageLogo = styled.Image`
  width: 320px;
  height: 200px;
  padding-top: 100px;
`;

export const PageTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-top: -450px;
  color: ${Colors.brand};
  padding: 30px;
  ${(props) =>
    props.welcome &&
    `
    font-size: 20px;
  `}
`;
export const PageTitle_1 = styled.Text`
  font-size: 40px;
  font-weight: bold;
  color: ${Colors.brand};
  padding: 5px;
  ${(props) =>
    props.welcome &&
    `
    font-size: 35px;
  `}
`;

export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${secondary};
  margin-bottom: 300px;
  margin-top: -360px;
  margin-left: 270px;
`;

export const WelcomeImage = styled.Image`
  margin-top: 40px;
  margin-left: -180px;
  width: 200px;
  height: 100px;
  margin-right: 1px;
`;

export const SubTitle = styled.Text`
  font-size: 20px;
  margin-left: 75px;
  margin-top: -15px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${brand};
  ${(props) =>
    props.welcome &&
    `
    margin-bottom: 5px;
    font-weight: normal;
  `}
`;

export const StyledTextInput = styled.TextInput`
  background-color: ${secondary};
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 5px;
  font-size: 16px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
  color: ${tertiary};
  font-size: 13px;
  text-align: left;
`;

export const LeftIcon = styled.View`
  left: 15px;
  top: 35px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 33px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${brand};
  border-radius: 15px;
  margin-vertical: 5px;
  height: 60px;
  width: 60px;
  left: 90px; 
  ${(props) =>
    props.google == true &&
    `
    background-color: ${green};
    flex-direction: row;
  `}
`;

export const ButtonText = styled.Text`
  color: ${primary};
  font-size: 20px;
  ${(props) =>
    props.google == true &&
    `
    color: ${primary};
    padding: 25px;
    left: 20px;
    bottom: 10px;
    justify-content: center;
  `}
`;

export const MsgBox = styled.Text`
  text-align: center;
  font-size: 13px;
  color: ${props => props.type == "SUCCESS" ? green : red};
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${darkLight};
  margin-vertical: 10px;
`;

export const StyledFormArea = styled.View`
  width: 90%;
`;

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const ExtraText = styled.Text`
  justify-content: center;
  align-content: center;
  color: ${tertiary};
  font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const TextLinkContent = styled.Text`
  color: ${brand};
  font-size: 15px;
`;