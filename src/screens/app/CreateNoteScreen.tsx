import { View, TextInput, ScrollView } from "react-native";
import React from "react";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Button from "../../components/Button";

interface IFormInput {
	title: string;
	body: string;
	image: string;
}

const CreateNoteScreen = () => {
	const { register, control, handleSubmit } = useForm<IFormInput>({
		defaultValues: {
			title: "",
			body: "",
			image: "",
		},
	});

	const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

	return (
		<ScrollView className="flex-1 bg-[#252525] p-5">
			<Controller
				name="title"
				control={control}
				render={({ field: { onChange, value, onBlur } }) => (
					<TextInput
						placeholder="Title"
						placeholderTextColor="#9A9A9A"
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						className="text-3xl color-[#ffffff]"
						multiline
						maxLength={55}
						autoCorrect={false}
					/>
				)}
			/>
			<View className="my-5">
				<Controller
					name="body"
					control={control}
					render={({ field: { onChange, value, onBlur } }) => (
						<TextInput
							placeholder="Create a new note"
							placeholderTextColor="#9A9A9A"
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							className="text-md color-[#ffffff]"
							multiline
							maxLength={450}
							autoCorrect={false}
						/>
					)}
				/>
			</View>
			<View className="flex-row w-fulljustify-between">
				<Button
					bgColor="red-700"
					title="Testing"
					color="white"
					width="w-6/12"
				/>
				<Button
					bgColor="yellow-700"
					title="Testing"
					color="white"
					width="w-6/12"
				/>
			</View>
		</ScrollView>
	);
};

export default CreateNoteScreen;
