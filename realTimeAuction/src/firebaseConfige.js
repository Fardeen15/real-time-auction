import firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyDi34BU0bza-dYxEsv2AQm0lEdHvz8Jz7I",
    authDomain: "realtimeauctionapp.firebaseapp.com",
    databaseURL: "https://realtimeauctionapp.firebaseio.com",
    projectId: "realtimeauctionapp",
    storageBucket: "realtimeauctionapp.appspot.com",
    messagingSenderId: "520204264976",
    appId: "1:520204264976:web:074e46b34e0693b2a8cc95"
};
firebase.initializeApp(firebaseConfig);
export const db = firebase.database()
export const auth = firebase.auth() 
export const storage = firebase.storage()