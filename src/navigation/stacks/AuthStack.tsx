import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../screens/auth/LoginScreen";

type AuthStackParamList = {
	Login: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Login" component={LoginScreen} />
		</Stack.Navigator>
	);
};

export default AuthStack;
