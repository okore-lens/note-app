import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/app/HomeScreen";

type AppStackParamList = {
	Home: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Home" component={HomeScreen} />
		</Stack.Navigator>
	);
};

export default AppStack;
