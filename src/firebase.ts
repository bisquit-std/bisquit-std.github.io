import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage } from "firebase/storage";
import { FIREBASE_CONFIG } from "./constants/secretConstants";

const firebaseConfig = FIREBASE_CONFIG;

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db, getDownloadURL };
