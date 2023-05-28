import { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";

import AppStack from "./stacks/AppStack";
import AuthStack from "./stacks/AuthStack";

const Navigation = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	return (
		<NavigationContainer>
			{isAuthenticated ? <AppStack /> : <AuthStack />}
		</NavigationContainer>
	);
};

export default Navigation;
