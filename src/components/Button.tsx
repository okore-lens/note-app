import { View, Text, Pressable } from "react-native";
import React from "react";

interface ButtonProps {
	title: string;
	color?: string;
	additionalStyles?: string;
	onPress: () => void;
	disabled?: boolean;
}

const Button = ({
	title = "Button",
	additionalStyles,
	color,
	onPress,
	disabled,
}: ButtonProps) => {
	return (
		<Pressable
			android_ripple={{ color: "#efe" }}
			className={`${additionalStyles} p-2 rounded-md 
            `}
			onPress={() => onPress()}
			disabled={disabled}
		>
			<Text className={`${color} text-center`}>{title}</Text>
		</Pressable>
	);
};

export default Button;
