import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Todo } from "./todo";

export type BottomTabStackParamList = {
	Home: undefined;
	Profile: undefined;
};

export type RootStackParamList = {
	BottomTabs: undefined;
	PreviewTodo: { todoItem: Todo };
	CreateTodo: undefined;
	EditTodo: { todoItem: Todo };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
	NativeStackScreenProps<RootStackParamList, Screen>;
