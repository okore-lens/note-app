import {
	View,
	TextInput,
	ScrollView,
	Text,
	Pressable,
	Image,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";

import { Ionicons } from "@expo/vector-icons";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../@types/rootStack";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
// import RadioButtonRN from "radio-buttons-react-native";

import uploadProfilePicture from "../../utils/UploadImage";
import ModalWrapper from "../../components/ModalWrapper";
import Button from "../../components/Button";
import { PriorityType, StatusType } from "../../@types/note";

interface IFormInput {
	title: string;
	body: string;
	image: string;
	status: StatusType;
	priority: PriorityType;
}

type CreateNoteScreenProps = NativeStackScreenProps<RootStackParamList>;

const CreateNoteScreen = ({ navigation }: CreateNoteScreenProps) => {
	const [modalVisible, setModalVisible] = useState<boolean>(false);

	// useForm hook
	const {
		register,
		control,
		handleSubmit,
		formState: { isValid },
	} = useForm<IFormInput>({
		defaultValues: {
			title: "",
			body: "",
		},
	});

	// priority types data

	const data = [
		{
			label: "low",
			accessibilityLabel: "Low",
		},
		{
			label: "medium",
			accessibilityLabel: "Medium",
		},
		{
			label: "high",
			accessibilityLabel: "High",
		},
	];

	// image Picker
	const [image, setImage] = useState<{ name: string; uri: string }>({
		name: "",
		uri: "",
	});

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
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

	// note submit handler

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		console.log(data);
		if (image.name) {
			const imageUrl = await uploadProfilePicture(
				image.uri,
				image.name,
				"notes"
			);
		}
		// console.log(imageUrl);
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
	}, []);

	return (
		<ScrollView className="flex-1 bg-[#3B3B3B] p-5">
			{modalVisible && (
				<ModalWrapper modalVisible additionalStyles="bg-[#00000030]">
					<View className="bg-[#252525] p-5 rounded-md min-h-[150] w-3/4 items-center">
						<Ionicons name="alert-circle" size={32} color="#ff10e0" />
						{isValid ? (
							<>
								<Text className="text-white text-xl">Save Note ?</Text>
								<View className="w-full flex-row justify-between my-4">
									<Button
										title="Discard"
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
									A note must have a title and a body!
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
			<Pressable
				android_ripple={{ color: "#efe" }}
				onPress={pickImage}
				className="h-[100] bg-[#555555] rounded-xl  items-center justify-center overflow-hidden mb-5"
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

			{/* <RadioButtonRN data={data} selectedBtn={(e) => console.log(e)} /> */}
			<Controller
				name="title"
				control={control}
				render={({ field: { onChange, value } }) => (
					<TextInput
						placeholder="Title"
						placeholderTextColor="#9A9A9A"
						value={value}
						onChangeText={onChange}
						className="text-3xl color-[#ffffff]"
						multiline
						maxLength={55}
						autoCorrect={false}
						{...register("title", { required: true })}
					/>
				)}
			/>
			<View className="my-5">
				<Controller
					name="body"
					control={control}
					render={({ field: { onChange, value } }) => (
						<TextInput
							placeholder="Create a new note"
							placeholderTextColor="#9A9A9A"
							value={value}
							onChangeText={onChange}
							className="text-md color-[#ffffff]"
							multiline
							maxLength={450}
							autoCorrect={false}
							{...register("body", { required: true })}
						/>
					)}
				/>
			</View>
		</ScrollView>
	);
};

export default CreateNoteScreen;
