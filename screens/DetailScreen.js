import React, {useState, useEffect} from "react";
import { View, Button, Text, Image, StyleSheet, Animated, TouchableWithoutFeedback, TouchableOpacity, ImageBackground, FlatList, ListViewComponent, ListItem, ActivityIndicator, SafeAreaView, RefreshControl, ScrollView, useWindowDimensions } from "react-native";
import { useNavigation } from '@react-navigation/core';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/Ionicons'

export default function DetailScreen(props) {
    const navigation = useNavigation()
    const dimensions = useWindowDimensions()
    const image = { width: dimensions.width / 2, height: dimensions.width / 2 }
    const [bottle, setBottle] = useState(null)
    let isFavorite = () => bottle.favorite === true || bottle.favorite === 'true'
    let isOpen = () => bottle.status === 'Opened'
    let dateString = () => {
        let components = (bottle.opened_data || bottle.opened_date).split('-').map(c => parseInt(c))
        let date = new Date(components[2], components[0] - 1, components[1], 0, 0, 0, 0)
        return date.toLocaleDateString()
    }

    const updateBottle = (snap) => {
        let array = snap.val()
        let selectedBottle = array.find(b => b.barcode.toString() === props.route.params.bottle.barcode.toString())
        selectedBottle && setBottle(selectedBottle)
    }

    useEffect(() => {
        firebase.database().ref().child('storage').on('value', updateBottle)
        return () => firebase.database().ref().child('storage').off('value', updateBottle)
    }, [])

    const toggleFavorite = () => {
        firebase.database().ref().child('storage').once('value', snap => {
            let array = snap.val()
            let index = array.findIndex(b => b.barcode.toString() === bottle.barcode.toString())
            if (index < 0)
                console.error('Bottle not found')
            else {
                array[index] = {...array[index], favorite: isFavorite() ? false : true}
                firebase.database().ref().child('storage').set(array, err => {
                    if (err) console.error(err)
                })
            }
        })
    }

    const setOpened = () => {
        if (isOpen())
            return
        firebase.database().ref().child('storage').once('value', snap => {
            let array = snap.val()
            let index = array.findIndex(b => b.barcode.toString() === bottle.barcode.toString())
            if (index < 0)
                console.error('Bottle not found')
            else {
                let date = new Date()
                let m = date.getMonth() + 1, d = date.getDate(), y = date.getFullYear()
                let dateStr = `${m >= 10 ? m : `0${m}`}-${d}-${y}`
                array[index] = { ...array[index], status: 'Opened', opened_data: dateStr, opened_date: dateStr }
                firebase.database().ref().child('storage').set(array, err => {
                    if (err) console.error(err)
                })
            }
        })
    }

    if (bottle === null)
        return <ImageBackground source={require('./../assets/background.jpg')} style={styles.background}/>

    return (
        <ImageBackground source={require('./../assets/background.jpg')} style={styles.background}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.listContainer}>
                    <ScrollView style={{paddingTop: 22}}>
                            <View style={styles.imageContainer}>
                                <Image source={bottle.image ? { uri: bottle.image } : require('../assets/wine_bottle_2.webp')} style={image} resizeMode="contain" />
                            </View>
                        <Text style={styles.name}>{bottle.bottle_name}</Text>
                        <Text style={styles.subtitle}>{bottle.type_of_wine} • {bottle.vintage} Vintage</Text>
                        <Text style={styles.subtitle}>{bottle.Region}, {bottle.Country}</Text>
                        <View style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 6 }}>
                            <Icon.Button onPress={toggleFavorite} style={{ paddingHorizontal: 6, justifyContent: 'center', alignSelf: 'center' }} name={isFavorite() ? 'heart-dislike-outline' : 'heart'}>{isFavorite() ? 'Unfavorite' : 'Favorite'}</Icon.Button>
                        </View>
                        <View style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 6 }}>
                            {!isOpen() ? <Icon.Button onPress={setOpened} style={{ paddingHorizontal: 6 }} name="wine">Mark opened</Icon.Button> : <Text style={{ fontStyle: 'italic', fontSize: 18 }}>Opened on {dateString()}</Text>}
                        </View>
                        <View style={{padding: 16, fontSize: 16}}>
                            <Text style={styles.detail}><Text style={{ fontWeight: 'bold' }}>Varietal(s): </Text>{bottle.varierals}</Text>
                            <Text style={styles.detail}><Text style={{ fontWeight: 'bold' }}>Age: </Text>{bottle.age} year{bottle.age !== 1 ? 's' : ''}</Text>
                            <Text style={styles.detail}><Text style={{ fontWeight: 'bold' }}>Best served: </Text>{bottle.enjoy}</Text>
                            <Text style={styles.detail}><Text style={{ fontWeight: 'bold' }}>Location: </Text>{bottle.location}</Text>
                            <Text style={styles.detail}><Text style={{ fontWeight: 'bold' }}>Pairing(s): </Text>{bottle.pairing.map((p, i, arr) => <Text key={p} style={{textTransform: i === 0 ? 'capitalize' : undefined}}>{p}{i === arr.length - 1 ? '' : ', '}</Text>)}</Text>
                        </View>
                        <Text style={styles.upc}>UPC: {bottle.barcode}</Text>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
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
    safeArea: {
        height: '100%',
        width: '100%'
    },
    listContainer: {
        flex: 1
    },
    row: { flexDirection: 'row' },
    imageContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
    name: {
        flex: 1,
        flexWrap: 'wrap',
        color: 'black',
        fontSize: 40,
        marginHorizontal: 32,
        marginTop: 16,
        fontWeight: '200',
        fontVariant: ['small-caps'],
        textAlign: 'center'
    },
    subtitle: { textTransform: 'capitalize', textAlign: 'center', fontSize: 20, marginTop: 6 },
    pairing: {textTransform: 'capitalize'},
    upc: {textAlign: 'center', opacity: 0.4, fontSize: 12},
    detail: {fontSize: 18}
});
