import app from "firebase/app";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyD-yrO2mMB0iYf0PAWJdQPCJr6oPAj5lXo",
    authDomain: "parking-app-demo.firebaseapp.com",
    databaseURL: "https://parking-app-demo.firebaseio.com",
    projectId: "parking-app-demo",
    storageBucket: "parking-app-demo.appspot.com",
    messagingSenderId: "481554726293",
    appId: "1:481554726293:web:a133c29c317224855d4a9c"
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        this.db = app.database();
        console.log('firebase init')
    }

    getTarget = () => {
        return this.db.ref('/target').once('value');
    }

    listenToPhones = () => {
        return this.db.ref('/phones');
    }

    getBeaconLocation = () => {
        return this.db.ref('/beacon');
    }

    getTargetLocation = () => {
        return this.db.ref('/target');
    }
}

const firebase = new Firebase();

export default firebase;