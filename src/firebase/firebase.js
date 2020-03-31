import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

// Initialize Firebase
firebase.initializeApp(firebaseConfig[0]);
export const database = firebase.database();
//firebase.analytics();

export default firebase;
