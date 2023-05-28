import { StatusBar } from "expo-status-bar";

import { SafeAreaView } from "react-native-safe-area-context";

import Navigation from "./src/navigation/Navigation";

export default function App() {
	return (
		<SafeAreaView className="flex-1">
			<StatusBar style="dark" />
			<Navigation />
		</SafeAreaView>
	);
}
