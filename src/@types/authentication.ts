import { Note } from "./note";

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
	createNote: (note: Note, user: userData) => void;
}
