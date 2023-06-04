import { View, FlatList, Pressable, Text, TextInput } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import RadioButtonRN from "radio-buttons-react-native-expo";

import { RootStackParamList } from "../../@types/rootStack";

import Todo from "../../components/Todo";
import { AuthContext } from "../../services/auth/AuthContext";
import { Todo as Itodo } from "../../@types/todo";
import ModalWrapper from "../../components/ModalWrapper";
import Button from "../../components/Button";
import { doInFuture, doToday } from "../../utils/dateFinder";
import LoadingModal from "../../components/LoadingModal";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList>;

const data = [
	{
		label: "All",
		accessibilityLabel: "all",
	},
	{
		label: "Completed",
		accessibilityLabel: "completed",
	},
	{
		label: "Active",
		accessibilityLabel: "active",
	},
	{
		label: "Today's",
		accessibilityLabel: "today's",
	},
	{
		label: "Future",
		accessibilityLabel: "future",
	},
	{
		label: "Overdue",
		accessibilityLabel: "overdue",
	},
];

const HomeScreen = ({ navigation }: HomeScreenProps) => {
	const user = useContext(AuthContext)!.user;
	const getTodoItem = useContext(AuthContext)!.getTodoItem;
	const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [todos, setTodos] = useState<Itodo[]>([]);
	const [activeTodos, setActiveTodos] = useState<Itodo[]>([]);
	const [completedTodos, setCompletedTodos] = useState<Itodo[]>([]);
	const [futureTodos, setFutureTodos] = useState<Itodo[]>([]);
	const [todaysTodos, setTodoysTodos] = useState<Itodo[]>([]);
	const [overdueTodos, setOverdueTodos] = useState<Itodo[]>([]);

	const [filteredTodos, setFilteredTodos] = useState<Itodo[]>([]);
	const [sortedTodos, setSortedTodos] = useState<Itodo[]>([]);

	const [searchTitle, setSearchTitle] = useState<string>("");

	const getNotes = async () => {
		setIsLoading(true);
		const todosId = user.todos;

		if (todosId) {
			const todosData = await Promise.all(
				user.todos.map(async (each: string) => {
					const todo_details: Itodo = await getTodoItem(each);

					const statusOverDue =
						todo_details.dueDate < new Date().getTime() &&
						todo_details.status === "active";

					const details = {
						id: each,
						...todo_details,
						status: statusOverDue ? "overdue" : todo_details.status,
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

			const activeTodosList: Itodo[] = [];
			const futureTodosList: Itodo[] = [];
			const todayTodosList: Itodo[] = [];
			const completedTodosList: Itodo[] = [];
			const overdueTodosList: Itodo[] = [];

			orderedByTime.forEach((item) => {
				// console.log(item);
				item.status === "active" && activeTodosList.push(item);
				item.status === "completed" && completedTodosList.push(item);
				item.status === "overdue" && overdueTodosList.push(item);
				doInFuture(item.dueDate) &&
					item.status !== "completed" &&
					futureTodosList.push(item);
				doToday(item.dueDate) &&
					item.status !== "completed" &&
					todayTodosList.push(item);
			});
			futureTodosList.forEach((item) =>
				console.log(
					new Date(item.dueDate).toLocaleDateString("en-GB", { day: "2-digit" })
				)
			);

			const sortCompletedTodos = completedTodosList.sort(
				(a: Itodo, b: Itodo) => b.completedAt! - a.completedAt!
			);
			setActiveTodos(activeTodosList);
			setTodos(orderedByTime);
			setSortedTodos(orderedByTime);
			setFutureTodos(futureTodosList);
			setTodoysTodos(todayTodosList);
			setCompletedTodos(sortCompletedTodos);
			setOverdueTodos(overdueTodosList);
		} else {
			setTodos([]);
		}
		setIsLoading(false);
	};

	const refreshHandler = async () => {
		try {
			setIsLoading(true);
			await getNotes();
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	const searchFilterFunction = (text: string) => {
		if (text) {
			const newData = todos.filter((item) => {
				const itemData = item.title
					? item.title.toUpperCase()
					: "".toUpperCase();
				const textData = text.toUpperCase();
				return itemData.indexOf(textData) > -1;
			});
			setFilteredTodos(newData);
		} else {
			setFilteredTodos([]);
		}
	};

	useEffect(() => {
		getNotes();
	}, [user.todos]);

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<View className="mr-5 bg-red-500 p-1 rounded-full">
					<Text className="text-white">{activeTodos.length}</Text>
				</View>
			),
			headerSearchBarOptions: {
				placeholder: "Search ...",
				onChangeText: (ev) => {
					searchFilterFunction(ev.nativeEvent.text);
				},
			},
		});
	}, [navigation, activeTodos]);

	const sortHandler = (e: { accessibilityLabel: string }) => {
		// console.log(e);
		if (e.accessibilityLabel === "active") {
			setSortedTodos(activeTodos);
		}
		if (e.accessibilityLabel === "overdue") {
			console.log(overdueTodos);
			setSortedTodos(overdueTodos);
		}
		if (e.accessibilityLabel === "today's") {
			setSortedTodos(todaysTodos);
		}
		if (e.accessibilityLabel === "all") {
			setSortedTodos(todos);
		}
		if (e.accessibilityLabel === "completed") {
			setSortedTodos(completedTodos);
		}
		if (e.accessibilityLabel === "future") {
			setSortedTodos(futureTodos);
		}

		// setModalVisible(false);
	};

	useEffect(() => {
		searchTitle ? searchFilterFunction(searchTitle) : setFilteredTodos([]);
	}, [searchTitle]);

	return (
		<View className="flex-1 bg-[#252525]  items-center pb-5 px-2">
			<LoadingModal modalVisible={isLoading} />
			<ModalWrapper modalVisible={modalVisible}>
				<View className="bg-[#252525] p-5 rounded-md min-h-[150] w-3/4 items-center">
					<Ionicons name="alert-circle" size={32} color="#ff10e0" />
					<Text className="text-white text-xl">Sort BY </Text>
					<RadioButtonRN
						data={data}
						selectedBtn={(e: any) => sortHandler(e)}
						boxStyle={{
							backgroundColor: "#00000020",
						}}
						style={{
							marginBottom: 10,
							width: "100%",
						}}
						circleSize={10}
						textStyle={{
							marginLeft: 3,
							color: "#ffffff",
							fontSize: 10,
						}}
						activeColor="#ff00e0"
						boxActiveBgColor="#000000"
					/>
					<Button
						title="Cancel"
						additionalStyles="w-[47%] bg-red-800"
						color="text-white"
						onPress={() => setModalVisible(false)}
					/>
				</View>
			</ModalWrapper>
			<View className="flex-row items-center px-4">
				<View className="w-full mt-2 border rounded-lg mr-2 border-yellow-700">
					<TextInput
						placeholder="Search..."
						placeholderTextColor="#9A9A9A"
						value={searchTitle}
						onChangeText={(text) => setSearchTitle(text)}
						className="text-lg color-[#ffffff] bg-[#00000020] rounded p-1 px-2 w-full "
					/>
				</View>
				<Pressable
					android_ripple={{ color: "#efe" }}
					onPress={() => setModalVisible(true)}
					className="items-center justify-center"
				>
					<MaterialIcons name="sort" size={32} color="yellow" />
				</Pressable>
			</View>
			{filteredTodos.length > 0 ? (
				<FlatList
					data={filteredTodos}
					className="w-full"
					onRefresh={refreshHandler}
					refreshing={isLoading}
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
							isRecurring={item.isRecurring}
							id={item.id}
						/>
					)}
				/>
			) : sortedTodos.length > 0 ? (
				<FlatList
					data={sortedTodos}
					className="w-full"
					onRefresh={refreshHandler}
					refreshing={isLoading}
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
							isRecurring={item.isRecurring}
							id={item.id}
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
