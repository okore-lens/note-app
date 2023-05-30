export type userData = {
	id: string;
	names: string | null;
	photoUrl: string;
	email: string | null;
	notes: [];
	createdAt: number;
};

export interface IAuth {
	isAuthenticated: boolean;
	user: userData;
	register: (userData: userData) => void;
	updateUser: (userData: userData) => void;
}
