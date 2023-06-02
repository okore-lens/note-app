import { Pressable, Text, View } from "react-native";
import React from "react";

import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Todo as ITodo } from "../@types/todo";
import { truncate } from "../utils/truncate";

const Todo = (todoItem: ITodo) => {
	const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

	return (
		<Pressable
			android_ripple={{ color: "#eee" }}
			className="w-full border-b border-[#868686] p-4 flex-row justify-between"
			onPress={() => navigation.navigate("PreviewTodo", { todoItem: todoItem })}
		>
			<View className="">
				<Text className="text-base text-white">
					{truncate(todoItem.title, 30)}
				</Text>
				<View
					className={` h-5 ${todoItem.priorityLevel === 1 && "bg-red-700"} ${
						todoItem.priorityLevel === 2 && "bg-green-700"
					} ${
						todoItem.priorityLevel === 3 && "bg-blue-700"
					} px-3  rounded-full self-start mt-1`}
				>
					<Text className=" text-white text-xs  ">{todoItem.priority}</Text>
				</View>
			</View>

			<View className="justify-between">
				<Text
					className={` h-5 max-w-[70] ${
						todoItem.status === "active" && "bg-yellow-700"
					} ${todoItem.status === "overdue" && "bg-slate-700"} ${
						todoItem.status === "completed" && "bg-green-700"
					} px-3  rounded-full text-white text-xs self-end `}
				>
					{todoItem.status}
				</Text>
				<Text className="text-red-600">
					{new Date(todoItem.createdAt).toLocaleDateString("en-GB", {
						month: "2-digit",
						day: "2-digit",
						year: "2-digit",
						hour: "2-digit",
						minute: "2-digit",
					})}
				</Text>
			</View>
		</Pressable>
	);
};

export default Todo;
