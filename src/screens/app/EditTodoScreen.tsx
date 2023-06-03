import {
	View,
	TextInput,
	ScrollView,
	Text,
	Pressable,
	Image,
	Switch,
} from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";

import { Ionicons } from "@expo/vector-icons";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import RadioButtonRN from "radio-buttons-react-native-expo";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

import { Todo } from "../../@types/todo";
import { RootStackScreenProps } from "../../@types/rootStack";

import uploadProfilePicture from "../../utils/UploadImage";
import ModalWrapper from "../../components/ModalWrapper";
import Button from "../../components/Button";
import { AuthContext } from "../../services/auth/AuthContext";

interface IFormInput {
	title: string;
	priority: string;
	isRecurring: boolean;
}

type EditTodoScreenParams = RootStackScreenProps<"EditTodo">;

// priority types data
const data = [
	{
		label: "low",
		accessibilityLabel: "low",
	},
	{
		label: "medium",
		accessibilityLabel: "medium",
	},
	{
		label: "high",
		accessibilityLabel: "high",
	},
];

const EditTodoScreen = ({ navigation, route }: EditTodoScreenParams) => {
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const todoItem = route.params.todoItem;

	const updateTodo = useContext(AuthContext)!.updateTodo;
	const user = useContext(AuthContext)!.user;

	// useForm hook
	const {
		register,
		control,
		handleSubmit,
		formState: { isValid },
	} = useForm<IFormInput>({
		defaultValues: {
			title: todoItem.title,
			isRecurring: todoItem.isRecurring,
			priority: todoItem.priority,
		},
	});

	// date picker
	const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
	const [date, setDate] = useState(new Date());
	const [day, setDay] = useState("Due Date");
	const [dueDate, setDueDate] = useState<number>(new Date().getTime());

	interface dateChangeParams {
		selectedDate: string | number | Date;
	}

	const onDateChange = (selectedDate: dateChangeParams) => {
		setOpenDatePicker(false);
		setDate(selectedDate);
		setDueDate(new Date(selectedDate).getTime());
		const tempDate = new Date(selectedDate).toLocaleDateString("en", {
			day: "2-digit",
			month: "2-digit",
			year: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
		});
		setDay(tempDate);
	};

	// image Picker
	const [image, setImage] = useState<{ name: string; uri: string }>({
		name: "",
		uri: "",
	});

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			// allowsEditing: true,
			// aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			const imageSelected = result.assets[0].uri;
			const filename = imageSelected.substring(
				imageSelected.lastIndexOf("/") + 1,
				imageSelected.length
			);
			setImage({ name: filename, uri: imageSelected });
		}
	};

	// todo submit handler

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		let form: Todo = {
			...todoItem,
			priority: data.priority,
			isRecurring: data.isRecurring,
			title: data.title,
			dueDate,
		};
		delete form.priorityLevel;
		if (form.imageUrl === undefined) {
			delete form.imageUrl;
		}
		if (image.name) {
			const imageUrl = await uploadProfilePicture(
				image.uri,
				image.name,
				"todos"
			);
			form = {
				...form,
				imageUrl,
			};
		}
		// console.log(form);
		await updateTodo(form);
		setModalVisible(false);
		navigation.navigate("BottomTabs");
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<Pressable
					android_ripple={{ color: "#eee" }}
					className="bg-[#3B3B3B]  mr-4 mt-4 p-2 rounded-md items-center justify-center"
					onPress={() => setModalVisible(true)}
				>
					<Ionicons name="save-outline" size={24} color="#ffffff" />
				</Pressable>
			),
		});
		todoItem.imageUrl &&
			setImage((prev) => ({ ...prev, uri: todoItem.imageUrl! }));
		setDay(
			new Date(todoItem.dueDate).toLocaleDateString("en", {
				day: "2-digit",
				month: "2-digit",
				year: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
			})
		);
	}, []);

	const formValid = isValid && dueDate;

	return (
		<ScrollView className="flex-1 bg-[#3B3B3B] p-5">
			{modalVisible && (
				<ModalWrapper modalVisible additionalStyles="bg-[#00000030]">
					<View className="bg-[#252525] p-5 rounded-md min-h-[150] w-3/4 items-center">
						<Ionicons name="alert-circle" size={32} color="#ff10e0" />
						{formValid ? (
							<>
								<Text className="text-white text-xl">Save Note ?</Text>
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
										onPress={handleSubmit(onSubmit)}
										disabled={!isValid}
									/>
								</View>
							</>
						) : (
							<>
								<Text className="text-white text-md text-center my-5">
									A todo item must have a title,priority level,recurring state
									and a due date!
								</Text>
								<Button
									title="Close"
									additionalStyles="w-[70%] bg-red-800"
									color="text-white"
									onPress={() => setModalVisible(false)}
								/>
							</>
						)}
					</View>
				</ModalWrapper>
			)}

			<Controller
				name="title"
				control={control}
				render={({ field: { onChange, value } }) => (
					<TextInput
						placeholder="Todo"
						placeholderTextColor="#9A9A9A"
						value={value}
						onChangeText={onChange}
						className="text-2xl color-[#ffffff] bg-[#00000020] rounded p-5 mt-5"
						multiline
						maxLength={55}
						autoCorrect={false}
						{...register("title", { required: true })}
					/>
				)}
			/>
			<Text className="bg-[#414141] px-3 w-2/3 rounded-full text-red-400 mb-4 mt-1 ">
				55 Maximum Characters
			</Text>
			<Controller
				name="priority"
				control={control}
				render={({ field: { onChange, value } }) => (
					<RadioButtonRN
						data={data}
						selectedBtn={(e: any) => onChange(e.label)}
						initial={todoItem.priorityLevel}
						boxStyle={{
							flexDirection: "row",
							width: "30%",
							backgroundColor: "#00000020",
						}}
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							marginBottom: 2,
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
				)}
			/>
			<View className="flex-row justify-between mt-4">
				<View className=" h-[50] items-center w-1/2 ">
					<Text className="text-white">Is Recurring?</Text>
					<Controller
						name="isRecurring"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Switch
								thumbColor={value ? "#DA0B85" : "#f4f3f4"}
								trackColor={{ false: "#767577", true: "#DA0B85" }}
								value={value}
								onValueChange={onChange}
							/>
						)}
					/>
				</View>

				<Pressable
					android_ripple={{ color: "#efe" }}
					onPress={() => setOpenDatePicker(true)}
					className=" border border-white  h-[50] w-[40%] justify-center rounded  items-center "
				>
					<Text className="text-white">{day}</Text>
				</Pressable>
			</View>

			{openDatePicker && (
				<DateTimePicker
					value={date}
					onChange={(_, date) => onDateChange(date)}
					minimumDate={moment().subtract(0, "years").toDate()}
					testID="dateTimePicker"
				/>
			)}

			<Pressable
				android_ripple={{ color: "#efe" }}
				onPress={pickImage}
				className="h-[200] bg-[#555555] rounded-xl  items-center justify-center overflow-hidden my-5"
			>
				{image.uri ? (
					<Image
						source={{ uri: image.uri }}
						style={{ resizeMode: "cover", height: "100%", width: "100%" }}
					/>
				) : (
					<>
						<Ionicons name="image" size={48} color="#ff00e0" />
						<Text className="text-white">Upload Image</Text>
					</>
				)}
			</Pressable>
		</ScrollView>
	);
};

export default EditTodoScreen;
