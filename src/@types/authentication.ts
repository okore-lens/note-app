import { Todo } from "./todo";

export type userData = {
	id: string;
	names: string | null;
	photoUrl: string;
	email: string | null;
	notes: string[];
	createdAt: number;
};

export interface IAuth {
	isAuthenticated: boolean;
	user: userData;
	register: (userData: userData) => void;
	createNote: (note: Todo, user: userData) => void;
}
