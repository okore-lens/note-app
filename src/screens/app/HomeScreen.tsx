import { View, FlatList, Pressable, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { Ionicons } from "@expo/vector-icons";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../@types/rootStack";

import Todo from "../../components/Todo";
import { AuthContext } from "../../services/auth/AuthContext";
import { Todo as Itodo } from "../../@types/todo";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
	const user = useContext(AuthContext)!.user;
	const getTodoItem = useContext(AuthContext)!.getTodoItem;

	const [todos, setTodos] = useState<Itodo[]>([]);

	const getNotes = async () => {
		const todosId = user.todos;

		if (todosId) {
			const todosData = await Promise.all(
				user.todos.map(async (each: string) => {
					const todo_details: Itodo = await getTodoItem(each);
					const details = {
						id: each,
						...todo_details,
						priorityLevel:
							todo_details.priority === "high"
								? 1
								: todo_details.priority === "medium"
								? 2
								: 3,
					};
					return details;
				})
			);

			const orderedByTime = todosData.sort(
				(a: Itodo, b: Itodo) => b.createdAt - a.createdAt
			);

			// const orderedByPriority = orderedByTime.sort(
			// 	(a: Itodo, b: Itodo) => a.priorityLevel - b.priorityLevel
			// );

			setTodos(orderedByTime);
		} else {
			setTodos([]);
		}
	};

	console.log(todos);

	useEffect(() => {
		getNotes();
	}, [user.todos]);

	return (
		<View className="flex-1 bg-[#252525]  items-center p-5 px-2">
			{todos.length > 0 ? (
				<FlatList
					data={todos}
					className="w-full"
					renderItem={({ item, index }) => (
						<Todo
							key={index}
							title={item.title}
							completedAt={item.completedAt}
							createdAt={item.createdAt}
							dueDate={item.dueDate}
							priority={item.priority}
							priorityLevel={item.priorityLevel}
							status={item.status}
							imageUrl={item?.imageUrl}
						/>
					)}
				/>
			) : (
				<Text>No Todos</Text>
			)}
			{/* <Todo /> */}
			<Pressable
				className={`bg-yellow-500 p-2 absolute right-4 bottom-[50] rounded-full`}
				onPress={() => navigation.navigate("CreateTodo")}
			>
				<Ionicons name="ios-add-outline" size={36} color="#ffffff" />
			</Pressable>
		</View>
	);
};

export default HomeScreen;
