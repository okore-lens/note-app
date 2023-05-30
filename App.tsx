import { StatusBar } from "expo-status-bar";

import { SafeAreaView } from "react-native-safe-area-context";

import Navigation from "./src/navigation/Navigation";
import AuthContextProvider from "./src/services/auth/AuthContext";

export default function App() {
	return (
		<AuthContextProvider>
			<SafeAreaView className="flex-1">
				<StatusBar style="light" backgroundColor="#000000" />
				<Navigation />
			</SafeAreaView>
		</AuthContextProvider>
	);
}
