import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../res/colors";
import DashboardScreen from "../screens/Dashboard";

const Stack = createStackNavigator();

const Dashboard = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: Colors.WhiteSmoke,
					shadowColor: Colors.BattleshipGray,
				},
				headerTintColor: Colors.white,
			}}
		>
			<Stack.Screen name="Dashboard" component={DashboardScreen} />
		</Stack.Navigator>
	);
};

export default Dashboard;
