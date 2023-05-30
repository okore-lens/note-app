import { View, Text, Pressable } from "react-native";
import React from "react";

interface ButtonProps {
	title: string;
	bgColor: string;
	color: string;
	width: string;
}

const Button = ({
	title = "Button",
	bgColor,
	color,
	width = "w-5/12",
}: ButtonProps) => {
	return (
		<Pressable
			android_ripple={{ color: "#efe" }}
			className={`bg-${bgColor} p-2 rounded-md ${width}
            `}
		>
			<Text className={`text-${color} text-center`}>{title}</Text>
		</Pressable>
	);
};

export default Button;
