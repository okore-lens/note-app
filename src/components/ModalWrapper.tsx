import { Modal, Text, View } from "react-native";
import React, { ReactNode } from "react";

interface ModalProps {
	children: ReactNode;
	modalVisible: boolean;
	additionalStyles?: string;
}

const ModalWrapper = ({
	children,
	modalVisible,
	additionalStyles,
}: ModalProps) => {
	return (
		<Modal animationType="fade" visible={modalVisible} transparent>
			<View
				className={`flex-1  items-center justify-center ${additionalStyles}`}
			>
				{children}
			</View>
		</Modal>
	);
};

export default ModalWrapper;
