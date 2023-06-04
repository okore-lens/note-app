import { Todo } from "./todo";

export type userData = {
	id: string;
	names: string | null;
	photoUrl: string;
	email: string | null;
	todos: string[];
	createdAt: number;
};

export interface IAuth {
	isAuthenticated: boolean;
	user: userData;
	register: (userData: userData) => void;
	createTodo: (note: Todo, user: userData) => void;
	getTodoItem: (note: string) => Todo;
	updateTodo: (note: Todo) => void;
	updateUser: (user: userData) => void;
}
