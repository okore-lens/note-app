import { Pressable, Text } from "react-native";
import React from "react";

import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const Note = () => {
	const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

	return (
		<Pressable
			android_ripple={{ color: "#eee" }}
			className="w-full bg-purple-600 p-4 rounded-lg"
			onPress={() => navigation.navigate("PreviewNote")}
		>
			<Text className="text-xl text-white">Note</Text>
		</Pressable>
	);
};

export default Note;
