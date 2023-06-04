import { Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import {
	GoogleSignin,
	GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

import { GOOGLE_WEB_CLIENT_ID } from "@env";
import { AuthContext } from "../../services/auth/AuthContext";
import LoadingModal from "../../components/LoadingModal";
const LoginScreen = () => {
	// hooks
	const [initializing, setInitializing] = useState<boolean>(true);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [user, setUser] = useState<any>();

	const authenticateUser = useContext(AuthContext)!.register;

	GoogleSignin.configure({
		webClientId: GOOGLE_WEB_CLIENT_ID,
	});

	const onAuthStateChanged = (user: any) => {
		setUser(user);
		if (initializing) setInitializing(false);
	};

	const onGoogleButtonPress = async () => {
		setIsLoading(true);
		const isSignedIn = await GoogleSignin.isSignedIn();
		if (isSignedIn) {
			await GoogleSignin.revokeAccess();
			await GoogleSignin.signOut();
		}
		// Check if your device supports Google Play
		await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

		const { idToken } = await GoogleSignin.signIn();

		// Create a Google credential with the token
		const googleCredential = auth.GoogleAuthProvider.credential(idToken);

		// Sign-in the user with the credential
		const user_sign_in = auth().signInWithCredential(googleCredential);
		const createdAt = Date.now();

		try {
			const data = await user_sign_in;
			await authenticateUser({
				email: data.user.email,
				id: data.user.uid,
				names: data.user.displayName,
				todos: [],
				photoUrl: data.user.photoURL || "",
				createdAt,
			});
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber;
	}, []);

	if (initializing) return null;

	return (
		<View className="flex-1 items-center p-10 pt-[15%]  bg-yellow-700">
			<LoadingModal modalVisible={isLoading} />
			<Text className="text-3xl font-extrabold text-center pb-5 text-white">
				E-Todos{" "}
			</Text>
			<Text className="text-sm text-slate-800 pb-10 font-extrabold text-center">
				Create Your own personalized ToDo Items 🚀{" "}
			</Text>
			<GoogleSigninButton onPress={onGoogleButtonPress} />
		</View>
	);
};

export default LoginScreen;
