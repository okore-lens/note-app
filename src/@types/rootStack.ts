import { Todo } from "./todo";

export type BottomTabStackParamList = {
	Home: undefined;
	Profile: undefined;
};

export type RootStackParamList = {
	BottomTabs: undefined;
	PreviewTodo: Todo;
	CreateTodo: undefined;
};
