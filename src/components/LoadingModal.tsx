import { ActivityIndicator, Modal, Text, View } from "react-native";
import React from "react";

import { UIActivityIndicator } from "react-native-indicators";

interface LoadingModalProps {
	modalVisible: boolean;
}

const LoadingModal = ({ modalVisible }: LoadingModalProps) => {
	return (
		<>
			<Modal visible={modalVisible} transparent={true}>
				<View className="flex-1 justify-center items-center bg-[#101011a6]">
					<View>
						<UIActivityIndicator color="white" />
					</View>
				</View>
			</Modal>
		</>
	);
};

export default LoadingModal;
