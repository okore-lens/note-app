import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import GoogleTest from "./src/components/GoogleTest";

export default function App() {
	return (
		<View className="flex-1 justify-center items-center">
			<Text className="text-ellipsis text-yellow-700">
				Open up App.tsx to start working on your app!
			</Text>
			<GoogleTest />
			<StatusBar style="auto" />
		</View>
	);
}
