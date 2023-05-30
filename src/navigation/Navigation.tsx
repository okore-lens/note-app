import { useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";

import AppStack from "./stacks/AppStack";
import AuthStack from "./stacks/AuthStack";
import { AuthContext } from "../services/auth/AuthContext";

const Navigation = () => {
	const isAuthenticated = useContext(AuthContext)!.isAuthenticated;

	return (
		<NavigationContainer>
			{isAuthenticated ? <AppStack /> : <AuthStack />}
		</NavigationContainer>
	);
};

export default Navigation;
