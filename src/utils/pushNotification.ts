import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Todo } from "../@types/todo";
import { truncate } from "./truncate";
import { Platform } from "react-native";

export const sendPushNotification = async (
	expoPushToken: string,
	itemData: Todo
) => {
	const message = {
		to: expoPushToken,
		sound: "default",
		title: "Overdue Todo Item",
		body: `Reminder to complete ${truncate(itemData.title, 20)}`,
		data: {
			dueDate: new Date(itemData.dueDate).toLocaleDateString("en-GB", {
				month: "2-digit",
				day: "2-digit",
				year: "2-digit",
			}),
		},
	};

	await fetch("https://exp.host/--/api/v2/push/send", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Accept-encoding": "gzip, deflate",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(message),
	});
};

export const registerForPushNotificationsAsync = async () => {
	let token;
	if (Device.isDevice) {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== "granted") {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== "granted") {
			alert("Failed to get push token for push notification!");
			return;
		}
		token = (await Notifications.getExpoPushTokenAsync()).data;
		console.log(token);
	} else {
		alert("Must use physical device for Push Notifications");
	}

	if (Platform.OS === "android") {
		Notifications.setNotificationChannelAsync("default", {
			name: "default",
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#ffbb007c",
		});
	}

	return token;
};
