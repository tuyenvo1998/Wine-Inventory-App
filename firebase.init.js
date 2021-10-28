import firebase from 'firebase'

export default function initializeFirebase() {
    if (firebase.apps.length > 0)
        return
    const firebaseConfig = {
        apiKey: "AIzaSyB4avPV_ui4vSnQL1vPra9u6gKbY4LiEHo",
        authDomain: "wine-inventory-cd5dc.firebaseapp.com",
        databaseURL: "https://wine-inventory-cd5dc-default-rtdb.firebaseio.com",
        projectId: "wine-inventory-cd5dc",
        storageBucket: "wine-inventory-cd5dc.appspot.com",
        messagingSenderId: "782673045288",
        appId: "1:782673045288:web:bf0f6c979222ed75ecd21d",
        measurementId: "G-Q6R4RHLC4C"
    };
    firebase.initializeApp(firebaseConfig);
}