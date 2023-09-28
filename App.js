import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "./src/screens/Dashboard";
import Colors from "./src/res/colors";

const Tabs = createBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Tabs.Navigator
				screenOptions={{
					tabBarLabelStyle: {
						color: Colors.white,
					},
					tabBarActiveBackgroundColor: Colors.EerieBlack,
					headerShown: false,
				}}
			>
				<Tabs.Screen
					name="Inicio"
					component={Dashboard}
					options={{
						tabBarIcon: ({ size }) => {
							return (
								<Image
									style={{
										tintColor: Colors.BattleshipGray,
										width: size,
										height: size,
									}}
									source={require("./assets/dashboards.png")}
								/>
							);
						},
					}}
				/>
			</Tabs.Navigator>
		</NavigationContainer>
	);
}
