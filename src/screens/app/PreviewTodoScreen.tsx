import { View, Text } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackScreenProps } from "../../@types/rootStack";
import { ScrollView } from "react-native-gesture-handler";

type PreviewTodoScreenProps = RootStackScreenProps<"PreviewTodo">;

const PreviewTodoScreen = ({ navigation, route }: PreviewTodoScreenProps) => {
	console.log(route.params.todoItem);

	return (
		<ScrollView className="flex-1 bg-[#3B3B3B] p-5">
			<Text>PreviewTodoScreen</Text>
		</ScrollView>
	);
};

export default PreviewTodoScreen;
