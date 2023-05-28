import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { FIREBASE_API } from "./global-config";

const firebaseConfig = {
	apiKey: FIREBASE_API.apiKey,
	authDomain: FIREBASE_API.authDomain,
	projectId: FIREBASE_API.projectId,
	storageBucket: FIREBASE_API.storageBucket,
	messagingSenderId: FIREBASE_API.messagingSenderId,
	appId: FIREBASE_API.appId,
	measurementId: FIREBASE_API.measurementId,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const db = getFirestore(app);
export const db = initializeFirestore(app, {
	experimentalForceLongPolling: true,
});

export const storage = getStorage(app);
