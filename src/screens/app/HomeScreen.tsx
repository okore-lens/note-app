import { View, Text, Pressable } from "react-native";
import React from "react";

import { Ionicons } from "@expo/vector-icons";

import Note from "../../components/Note";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../@types/rootStack";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
	return (
		<View className="flex-1 bg-[#252525]  items-center p-5">
			<Note />
			<Pressable
				className={`bg-yellow-500 p-2 absolute right-8 bottom-1/4 rounded-full`}
				onPress={() => navigation.navigate("CreateNote")}
			>
				<Ionicons name="ios-add-outline" size={36} color="#ffffff" />
			</Pressable>
		</View>
	);
};

export default HomeScreen;
