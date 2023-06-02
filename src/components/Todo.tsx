import { Pressable, Text } from "react-native";
import React from "react";

import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const Todo = () => {
	const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

	return (
		<Pressable
			android_ripple={{ color: "#eee" }}
			className="w-full bg-purple-600 p-4 rounded-lg"
			onPress={() => navigation.navigate("PreviewTodo")}
		>
			<Text className="text-xl text-white">Todo</Text>
		</Pressable>
	);
};

export default Todo;
