import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "./src/screens/Dashboard";
import Colors from "./src/res/colors";
import LoginScreen from "./src/screens/Login";
import { useUserStore } from "./src/store/userStore";

const Tabs = createBottomTabNavigator();

export default function App() {
	const state = useUserStore((state) => state);
	return (
		<NavigationContainer>
			<Tabs.Navigator
				screenOptions={{
					tabBarLabelStyle: {
						color: Colors.white,
					},
					tabBarActiveBackgroundColor: Colors.EerieBlack,
					headerShown: false,
					tabBarStyle: {
						backgroundColor: Colors.EerieBlack,
					},
					tabBarHideOnKeyboard: true,
				}}
			>
				{state.token ? (
					<>
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
					</>
				) : (
					<>
						<Tabs.Screen
							name="Login"
							component={LoginScreen}
							options={{
								tabBarIconStyle: {
									display: "none",
								},
								tabBarItemStyle: {
									display: "none",
								},
							}}
						/>
					</>
				)}
			</Tabs.Navigator>
		</NavigationContainer>
	);
}
