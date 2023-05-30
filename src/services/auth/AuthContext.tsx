import {
	useState,
	createContext,
	ReactNode,
	useMemo,
	useCallback,
} from "react";

import { setDoc, doc, getDoc, collection, getDocs } from "firebase/firestore";

import { db } from "../../firebase";
import { IAuth, userData } from "../../@types/authentication";

export const AuthContext = createContext<IAuth | null>(null);

interface authContextProvider {
	children: ReactNode;
}

const AuthContextProvider = ({ children }: authContextProvider) => {
	const [user, setUser] = useState<userData | any>({
		email: "",
		id: "",
		notes: [],
		names: "",
		photoUrl: "",
		createdAt: Date.now(),
	});

	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const register = useCallback(async (userData: userData) => {
		// created At
		const createdAt = Date.now();

		// db connection refs
		const userRef = doc(db, "users", userData.id);

		//user doc snapshot in the db
		const userDocSnap = await getDoc(userRef);

		// conditional operations dependant on  user existance
		if (userDocSnap.exists()) {
			const userDoc = userDocSnap.data();
			setUser(userDoc);
		} else {
			await setDoc(userRef, userData);
			setUser(userData);
		}
		setIsAuthenticated(true);
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
