import { Pressable, Text } from "react-native";
import React from "react";

import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Todo as ITodo } from "../@types/todo";

const Todo = (todoItem: ITodo) => {
	const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

	return (
		<Pressable
			android_ripple={{ color: "#eee" }}
			className="w-full bg-purple-600 p-4 rounded-lg my-1"
			onPress={() => navigation.navigate("PreviewTodo", { todo: todoItem })}
		>
			<Text className="text-xl text-white">{todoItem.title}</Text>
		</Pressable>
	);
};

export default Todo;
