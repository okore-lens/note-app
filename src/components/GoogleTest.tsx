import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import {
	GoogleSignin,
	GoogleSigninButton,
	statusCodes,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

import { GOOGLE_WEB_CLIENT_ID } from "../global-config";

const GoogleTest = () => {
	const [initializing, setInitializing] = useState<boolean>(true);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [user, setUser] = useState<any>();

	GoogleSignin.configure({
		webClientId: GOOGLE_WEB_CLIENT_ID,
	});

	const onAuthStateChanged = (user: any) => {
		setUser(user);
		if (initializing) setInitializing(false);
	};

	const onGoogleButtonPress = async () => {
		// const isSignedIn = await GoogleSignin.isSignedIn();
		// if (isSignedIn) {
		// 	await GoogleSignin.revokeAccess();
		// 	await GoogleSignin.signOut();
		// }
		// Check if your device supports Google Play
		await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

		const { idToken } = await GoogleSignin.signIn();

		console.log(idToken);

		const userDetails = await GoogleSignin.signIn();

		console.log(userDetails);

		// Sign-in the user with the credential
		// const user_sign_in = auth().signInWithCredential(googleCredential);
		// user_sign_in
		// 	.then((data) => {
		// 		console.log(data)
		// 	})
		// 	.catch((err) => console.log(err));
	};

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber;
	}, []);

	if (initializing) return null;

	return (
		<View>
			<Text>GoogleTest</Text>
			<GoogleSigninButton onPress={onGoogleButtonPress} />
		</View>
	);
};

export default GoogleTest;
