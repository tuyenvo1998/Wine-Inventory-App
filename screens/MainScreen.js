import React from "react";
import { View, Button, Text, StyleSheet, Animated, TouchableWithoutFeedback, TouchableOpacity, ImageBackground, FlatList, ListViewComponent, ListItem, ActivityIndicator, SafeAreaView, RefreshControl } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/core';
import firebase from 'firebase';
import BottleView from "../views/BottleView";
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class MainScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = { bottles: null }
        this.loadBottles = this.loadBottles.bind(this)
    }

    animation = new Animated.Value(0);

    goToBarcodeScanner(event) {
        this.props.navigation.navigate("BarcodeScanner");
    }

    goToAddBottle(event) {
        this.props.navigation.navigate("AddBottleScreen", {
            bottle: null,
        });
    }

    toggleMenu = () => {
        const toValue = this.open ? 0 : 1;

        Animated.spring(this.animation, {
            toValue,
            friction: 5,
            useNativeDriver: false // Add This line

        }).start();

        this.open = !this.open;

    };

    loadBottles(snap) {
        let obj = snap.val()
        this.setState({ bottles: Object.getOwnPropertyNames(obj).map(n => obj[n]) })
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerLeft: () => <Icon.Button name="sign-out-alt" backgroundColor="transparent" underlayColor="transparent" color="#007AFF" onPress={() => firebase.auth().signOut().then(() => this.props.navigation.replace('Login'))}><Text style={{ fontSize: 15 }} /></Icon.Button>        })
        this.reference = firebase.database().ref().child('storage').child(firebase.auth().currentUser.uid)
        this.reference.on('value', this.loadBottles)
    }

    componentWillUnmount() {
        this.reference && this.reference.off('value', this.loadBottles)
    }

    render() {
        const pinStyle = {
            transform: [
                { scale: this.animation },
                {
                    translateY: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -80],
                    })
                }
            ]
        };

        const thumbStyle = {
            transform: [
                { scale: this.animation },
                {
                    translateY: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -140]
                    })
                }
            ]
        };

        const heartStyle = {
            transform: [
                { scale: this.animation },
                {
                    translateY: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -200]
                    })
                }
            ]
        };

        const rotation = {
            transform: [
                {
                    rotate: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0deg", "45deg"]
                    })
                }
            ]
        };

        const opacity = this.animation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0, 1],

        });

        return (
            <ImageBackground source={require('./../assets/background.jpg')} style={styles.background}>
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.listContainer}>
                        <FlatList data={[...(this.state.bottles || []), { __spacer: true }]} keyExtractor={(item, i) => item.__spacer ? "spacer" : (item.id || i.toString())} renderItem={({ item }) => item.__spacer ? <View style={{ height: 200 }} /> : <BottleView bottle={item} />} />
                    </View>
                </SafeAreaView>

                <View style={[styles.container, this.props.style]}>
                    <TouchableWithoutFeedback onPress={() => this.goToBarcodeScanner()}>
                        <Animated.View style={[styles.button, styles.secondary, heartStyle, opacity]} >
                            <AntDesign name="camera" size={20} color="#F02A4B" />
                        </Animated.View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => this.goToAddBottle()}>
                        <Animated.View style={[styles.button, styles.secondary, thumbStyle, opacity]}>
                            <Entypo name="text" size={20} color="#F02A4B" />
                        </Animated.View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={this.toggleMenu}>
                        <Animated.View style={[styles.button, styles.menu, rotation]}>
                            <AntDesign name="plus" size={24} color="#FFF" />
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        position: "absolute",

    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        position: "absolute",
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        alignItems: "center",
        justifyContent: "center",
        shadowRadius: 10,
        shadowColor: "#F02A4B",
        shadowOpacity: 0.3,
        shadowOffset: { height: 10 },

    },
    menu: {
        backgroundColor: "#F02A4B",
        marginLeft: 300,
        marginTop: 250,
    },
    secondary: {
        width: 55,
        height: 55,
        borderRadius: 48 / 2,
        backgroundColor: "#FFF",
        marginTop: 310,
    },
    safeArea: {
        height: '100%',
        width: '100%'
    },
    listContainer: {
        flex: 1,
        paddingTop: 22,
        marginHorizontal: 10
    }
});
