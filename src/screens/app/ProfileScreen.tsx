import { View, Text, Image } from "react-native";
import React, { useContext } from "react";

import { AuthContext } from "../../services/auth/AuthContext";

const ProfileScreen = () => {
	const user = useContext(AuthContext)!.user;
	return (
		<View className="flex-1 bg-[#252525] items-center p-3">
			<View className="h-1/3 flex-row justify-between w-full">
				<View className="w-[48%] items-center justify-center">
					<Image
						source={{
							uri:
								user.photoUrl ||
								"https://w0.peakpx.com/wallpaper/979/89/HD-wallpaper-purple-smile-design-eye-smily-profile-pic-face.jpg",
						}}
						className="w-[100] h-[100] rounded-full "
						style={{ resizeMode: "contain" }}
					/>
				</View>
				<View className="w-[48%] rounded-lg border border-blue-400 ">
					<View className="p-2">
						<Text className="text-white">Names</Text>
						<Text className="text-yellow-400">{user.names}</Text>
					</View>
					<View className="p-2">
						<Text className="text-white">Email</Text>
						<Text className="text-yellow-400">{user.email}</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

export default ProfileScreen;
