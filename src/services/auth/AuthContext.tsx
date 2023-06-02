import {
	useState,
	createContext,
	ReactNode,
	useMemo,
	useCallback,
} from "react";

import {
	setDoc,
	doc,
	getDoc,
	collection,
	getDocs,
	addDoc,
	updateDoc,
	arrayUnion,
} from "firebase/firestore";

import { db } from "../../firebase";
import { IAuth, userData } from "../../@types/authentication";
import { Todo } from "../../@types/todo";

export const AuthContext = createContext<IAuth | null>(null);

interface authContextProvider {
	children: ReactNode;
}

const AuthContextProvider = ({ children }: authContextProvider) => {
	const [user, setUser] = useState<userData | any>({
		email: "",
		id: "",
		todos: [],
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

	const createTodo = useCallback(async (todo: Todo, user: userData) => {
		// db connection ref
		const todoRef = await addDoc(collection(db, "todos"), todo);

		// created todo Id
		const todoId = todoRef.id;

		// update Firebase User Doc
		await updateDoc(doc(db, "users", user.id), {
			todos: arrayUnion(todoId),
		});

		// update app User
		const previousTodos = user.todos || [];
		const updatedProfile = {
			...user,
			todos: [...previousTodos, todoId],
		};

		updateUser(updatedProfile);
	}, []);

	const getTodoItem = async (todo: string) => {
		const todosRef = doc(db, "todos", todo);
		const todosDocSnapshot = await getDoc(todosRef);
		if (todosDocSnapshot.exists()) {
			console.log(todosDocSnapshot.data());
			return todosDocSnapshot.data() as Promise<Todo>;
		}
	};

	const value = useMemo(
		() => ({ user, isAuthenticated, register, createTodo, getTodoItem }),
		[user, isAuthenticated, register, createTodo, getTodoItem]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
