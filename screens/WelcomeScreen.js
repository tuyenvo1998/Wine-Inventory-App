import React from 'react';
import { ImageBackground, StyleSheet, View, Text, Image, TextInput} from 'react-native';



function WelcomeScreen(props) {
    const [text, onChangeText] = React.useState("Useless Text");
    const [number, onChangeNumber] = React.useState(null);
    return (    
        <View style={styles.container}>
            <ImageBackground source={require('../assets/background.jpg')} style={styles.background}>
                <Image style={styles.appLogo}
                    source={require('../assets/wine_bottle_2.webp')} 
                />
            </ImageBackground>
        </View>
    );
}
const styles = StyleSheet.create({
    background: {
        flex: 1, // entire screen
        justifyContent: "flex-end",
    },
    container: {
        flex: 1,
    },
    appLogo: {
        width: 300,
        height: 300,
        marginVertical: 300,
        marginHorizontal: 40,
    },

});

export default WelcomeScreen;