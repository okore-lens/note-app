import {
	useState,
	createContext,
	ReactNode,
	useMemo,
	useCallback,
} from "react";

import { setDoc, doc, getDoc, collection, getDocs } from "firebase/firestore";

import { IAuth, userData } from "../../@types/authentication";

export const AuthContext = createContext<IAuth | null>(null);

interface authContextProvider {
	children: ReactNode;
}

const AuthContextProvider = ({ children }: authContextProvider) => {
	const [user, setUser] = useState<userData>({
		email: "",
		id: "",
		notes: [],
		names: "",
		photoUrl: "",
	});

	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const register = useCallback((userData: userData) => {
		console.log(userData);
		// setIsAuthenticated(true);
	}, []);

	const updateUser = useCallback((userData: userData) => {
		setUser(userData);
	}, []);

	const value = useMemo(
		() => ({ user, isAuthenticated, register, updateUser }),
		[user, isAuthenticated, register, updateUser]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
