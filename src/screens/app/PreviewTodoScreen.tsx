import { View, Text, Image } from "react-native";
import React, { ReactElement, useContext, useState } from "react";

import {
	EvilIcons,
	Ionicons,
	Feather,
	MaterialIcons,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

import { RootStackScreenProps } from "../../@types/rootStack";
import Button from "../../components/Button";
import ModalWrapper from "../../components/ModalWrapper";
import { AuthContext } from "../../services/auth/AuthContext";
import { Todo } from "../../@types/todo";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import LoadingModal from "../../components/LoadingModal";

type PreviewTodoScreenProps = RootStackScreenProps<"PreviewTodo">;

const PreviewTodoScreen = ({ navigation, route }: PreviewTodoScreenProps) => {
	const updateTodo = useContext(AuthContext)!.updateTodo;
	const user = useContext(AuthContext)!.user;
	const updateUser = useContext(AuthContext)!.updateUser;
	const todoItem = route.params.todoItem as Todo;
	const [modalItem, setModalItem] = useState<ReactElement>(
		<View>
			<Text>Modal Item</Text>
		</View>
	);
	// console.log(todoItem);

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [modalVisible, setModalVisible] = useState<boolean>(false);

	const completeTodo = async () => {
		setIsLoading(true);
		try {
			if (todoItem.imageUrl === undefined) {
				delete todoItem.imageUrl;
			}
			updateTodo({
				...todoItem,
				status: "completed",
				completedAt: new Date().getTime(),
			});
			navigation.goBack();
		} catch (e) {
			console.log(e);
		} finally {
			setIsLoading(false);
		}
	};

	const completeHandler = () => {
		setModalItem(
			<>
				<Text className="text-white text-xl">Complete Note ?</Text>
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
						onPress={completeTodo}
					/>
				</View>
			</>
		);
		setModalVisible(true);
	};

	const deleteTodo = async () => {
		setIsLoading(true);
		const todosRef = doc(db, `todos`, todoItem.id!);
		await deleteDoc(todosRef);

		const filteredTodos = user.todos.filter(
			(item: string) => item !== todoItem.id
		);

		await updateDoc(doc(db, "users", user.id), {
			todos: arrayRemove(todoItem.id),
		});

		const updatedProfile = {
			...user,
			todos: filteredTodos,
		};

		updateUser(updatedProfile);
		setIsLoading(false);
		navigation.goBack();
	};

	const deleteHandler = async () => {
		setModalItem(
			<>
				<Text className="text-white text-xl">Delete Note ?</Text>
				<View className="w-full flex-row justify-between my-4">
					<Button
						title="Cancel"
						additionalStyles="w-[47%] bg-red-800"
						color="text-white"
						onPress={() => setModalVisible(false)}
					/>
					<Button
						title="Delete"
						additionalStyles="w-[47%] bg-green-800 "
						color="text-white"
						onPress={deleteTodo}
					/>
				</View>
			</>
		);
		setModalVisible(true);
	};

	return (
		<ScrollView className="flex-1 bg-[#3B3B3B] p-5">
			<LoadingModal modalVisible={isLoading} />
			<ModalWrapper
				modalVisible={modalVisible}
				additionalStyles="bg-[#00000030]"
			>
				<View className="bg-[#252525] p-5 rounded-md min-h-[150] w-3/4 items-center">
					<Ionicons name="alert-circle" size={32} color="#ff10e0" />
					{modalItem}
				</View>
			</ModalWrapper>
			<View className="flex-row  w-full items-center justify-between">
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
				{todoItem.isRecurring && (
					<EvilIcons name="refresh" size={36} color="white" />
				)}
			</View>
			<Text className="text-white text-xl my-3">{todoItem.title}</Text>

			<View className="flex-row justify-between mb-4">
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
			{todoItem.imageUrl && (
				<View className="bg-slate-400 h-[200] rounded-xl overflow-hidden">
					<Image
						source={{ uri: todoItem.imageUrl }}
						className="h-full w-full"
					/>
				</View>
			)}
			<View className="flex-row mt-10 justify-between px-5">
				<MaterialCommunityIcons
					onPress={deleteHandler}
					name="delete-outline"
					size={24}
					color="red"
				/>
				{todoItem.status !== "completed" && (
					<>
						<Feather
							name="edit"
							size={24}
							color="white"
							onPress={() =>
								navigation.navigate("EditTodo", { todoItem: todoItem })
							}
						/>
						<MaterialIcons
							name="done-outline"
							size={24}
							color="green"
							onPress={completeHandler}
						/>
					</>
				)}
			</View>
		</ScrollView>
	);
};

export default PreviewTodoScreen;
