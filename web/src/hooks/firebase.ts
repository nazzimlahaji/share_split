// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signOut as signOutFn,
} from "firebase/auth";
// import { getDatabase } from "firebase/database";
// import { getRemoteConfig } from "firebase/remote-config";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// https://console.firebase.google.com/u/1/project/snapnpay-15d6d/overview
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  //   databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
// export const database = getDatabase(app);

// Initialize Remote Config and get a reference to the service
// export const remoteConfig = getRemoteConfig(app);

// remoteConfig.settings.minimumFetchIntervalMillis = 3600000; // 60 minutes for development purpose
// remoteConfig.settings.minimumFetchIntervalMillis = 3000;

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const signOut = () => {
  return signOutFn(auth);
};

// Initialize Firebase
// const analytics = getAnalytics(app);
