import { View, Text, Image } from "react-native";
import React, { useState } from "react";

import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

import { RootStackScreenProps } from "../../@types/rootStack";
import Button from "../../components/Button";
import ModalWrapper from "../../components/ModalWrapper";

type PreviewTodoScreenProps = RootStackScreenProps<"PreviewTodo">;

const PreviewTodoScreen = ({ navigation, route }: PreviewTodoScreenProps) => {
	const todoItem = route.params.todoItem;
	// console.log(todoItem);

	const [modalVisible, setModalVisible] = useState<boolean>(false);

	return (
		<ScrollView className="flex-1 bg-[#3B3B3B] p-5">
			<ModalWrapper
				modalVisible={modalVisible}
				additionalStyles="bg-[#00000030]"
			>
				<View className="bg-[#252525] p-5 rounded-md min-h-[150] w-3/4 items-center">
					<Ionicons name="alert-circle" size={32} color="#ff10e0" />
					<Text className="text-white text-xl">Update Note ?</Text>
					<View className="w-full flex-row justify-between my-4">
						<Button
							title="Cancel"
							additionalStyles="w-[47%] bg-red-800"
							color="text-white"
							onPress={() => setModalVisible(false)}
						/>
						<Button
							title="Save"
							additionalStyles="w-[47%] bg-green-800 "
							color="text-white"
							onPress={() => console.log("Submited")}
						/>
					</View>
				</View>
			</ModalWrapper>
			<View className="flex-row justify-between w-full items-center">
				{todoItem.isRecurring && (
					<EvilIcons name="refresh" size={36} color="white" />
				)}
				<View
					className={` h-5 ${todoItem.priorityLevel === 1 && "bg-red-700"} ${
						todoItem.priorityLevel === 2 && "bg-green-700"
					} ${
						todoItem.priorityLevel === 3 && "bg-blue-700"
					} px-3  rounded-full self-start my-3`}
				>
					<Text className="text-white text-sm">
						{todoItem.priority.toLocaleUpperCase()}
					</Text>
				</View>
			</View>

			{todoItem.imageUrl && (
				<View className="bg-slate-400 h-[200] rounded-xl overflow-hidden">
					<Image
						source={{ uri: todoItem.imageUrl }}
						className="h-full w-full"
					/>
				</View>
			)}
			<Text className="text-white text-xl my-3">{todoItem.title}</Text>

			<View className="flex-row justify-between">
				<Text className="text-white text-sm border-b border-[#222222] bg-yellow-400 p-5 w-[45%] rounded-lg ">
					Created On{" "}
					{new Date(todoItem.createdAt).toLocaleDateString("en-GB", {
						month: "2-digit",
						day: "2-digit",
						year: "2-digit",
						hour: "2-digit",
						minute: "2-digit",
					})}
				</Text>
				{todoItem.status === "completed" ? (
					<Text className="text-white text-sm border-b border-[#222222] bg-green-400 p-5 w-[45%] rounded-lg ">
						Completed At{" "}
						{new Date(todoItem.completedAt!).toLocaleDateString("en-GB", {
							month: "2-digit",
							day: "2-digit",
							year: "2-digit",
							hour: "2-digit",
							minute: "2-digit",
						})}
					</Text>
				) : todoItem.status === "overdue" ? (
					<Text className="text-white text-sm border-b border-[#222222] bg-red-800 p-5 w-[45%] rounded-lg ">
						Overdue{" "}
						{new Date(todoItem.dueDate).toLocaleDateString("en-GB", {
							month: "2-digit",
							day: "2-digit",
							year: "2-digit",
							hour: "2-digit",
							minute: "2-digit",
						})}
					</Text>
				) : (
					<Text className="text-white text-sm border-b border-[#222222] bg-red-400 p-5 w-[45%] rounded-lg ">
						Due Date{" "}
						{new Date(todoItem.dueDate).toLocaleDateString("en-GB", {
							month: "2-digit",
							day: "2-digit",
							year: "2-digit",
							hour: "2-digit",
							minute: "2-digit",
						})}
					</Text>
				)}
			</View>
			<View className="flex-row mt-10 justify-between px-5">
				<Button
					title="Edit Todo"
					onPress={() =>
						navigation.navigate("EditTodo", { todoItem: todoItem })
					}
					additionalStyles="bg-slate-400 w-[47%]"
					color="text-white"
				/>
				<Button
					title="Completed"
					onPress={() => setModalVisible(true)}
					additionalStyles="bg-green-500 w-[47%]"
					color="text-white"
				/>
			</View>
		</ScrollView>
	);
};

export default PreviewTodoScreen;
