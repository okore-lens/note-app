export type userData = {
	id: string | null;
	names: string | null;
	photoUrl: string | null;
	email: string | null;
	notes: [];
};

export interface IAuth {
	isAuthenticated: boolean;
	user: userData;
	register: (userData: userData) => void;
	updateUser: (userData: userData) => void;
}
