import { Image, Pressable } from "react-native";
import { useContext } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Foundation, Ionicons } from "@expo/vector-icons";

import {
	RootStackParamList,
	BottomTabStackParamList,
} from "../../@types/rootStack";

import { AuthContext } from "../../services/auth/AuthContext";

import HomeScreen from "../../screens/app/HomeScreen";
import ProfileScreen from "../../screens/app/ProfileScreen";
import PreviewNoteScreen from "../../screens/app/PreviewNoteScreen";
import CreateNoteScreen from "../../screens/app/CreateNoteScreen";

const BottomTabStack = createBottomTabNavigator<BottomTabStackParamList>();

const BottomStack = () => {
	const user = useContext(AuthContext)!.user;

	return (
		<BottomTabStack.Navigator
			screenOptions={{
				tabBarShowLabel: false,
				tabBarStyle: {
					elevation: 0,
					backgroundColor: "#252525",
					borderTopWidth: 0,
					paddingBottom: 10,
				},
				headerShadowVisible: false,
				headerStyle: {
					backgroundColor: "#252525",
				},
				headerTintColor: "#ffffff",
			}}
		>
			<BottomTabStack.Screen
				name="Home"
				component={HomeScreen}
				options={{
					headerTitle: "E-Notes",
					tabBarIcon: ({ focused }) => (
						<>
							{focused ? (
								<Foundation name="clipboard-notes" size={32} color="#ff0000" />
							) : (
								<Foundation name="clipboard-notes" size={32} color="#ffffff" />
							)}
						</>
					),
					headerRight: () => (
						<Pressable
							android_ripple={{ color: "#eee" }}
							className="bg-[#3B3B3B]  mr-4 mt-4 p-1 rounded-md items-center justify-center"
						>
							<Ionicons name="md-search-sharp" size={24} color="#ffffff" />
						</Pressable>
					),
				}}
			/>

			<BottomTabStack.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<Image
							source={{ uri: user.photoUrl }}
							className="h-[32] w-[32] rounded-2xl"
						/>
					),
				}}
			/>
		</BottomTabStack.Navigator>
	);
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerTintColor: "#ffffff",
				headerStyle: {
					backgroundColor: "#252525",
				},
				headerShadowVisible: false,
				headerTitle: "",
			}}
		>
			<Stack.Screen
				name="BottomTabs"
				component={BottomStack}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="PreviewNote"
				component={PreviewNoteScreen}
				options={{
					headerRight: () => (
						<Pressable
							android_ripple={{ color: "#eee" }}
							className="bg-[#3B3B3B]  mr-4 mt-4 p-2 rounded-md items-center justify-center"
						>
							<Ionicons name="save-outline" size={18} color="#ffffff" />
						</Pressable>
					),
				}}
			/>
			<Stack.Screen
				name="CreateNote"
				component={CreateNoteScreen}
				options={{
					headerRight: () => (
						<Pressable
							android_ripple={{ color: "#eee" }}
							className="bg-[#3B3B3B]  mr-4 mt-4 p-2 rounded-md items-center justify-center"
						>
							<Ionicons name="save-outline" size={18} color="#ffffff" />
						</Pressable>
					),
				}}
			/>
		</Stack.Navigator>
	);
};

export default AppStack;
