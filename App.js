import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "./src/screens/Dashboard";
import Colors from "./src/res/colors";
import LoginScreen from "./src/screens/Login";
import { useUserStore } from "./src/store";
import Products from "./src/screens/Products";
import Cart from "./src/screens/Cart";
import Profile from "./src/screens/Profile";
import ProductDetail from "./src/screens/ProductDetail";

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
						<Tabs.Screen
							name="Productos"
							component={Products}
							options={{
								tabBarIcon: ({ size }) => {
									return (
										<Image
											style={{
												tintColor: Colors.BattleshipGray,
												width: size,
												height: size,
											}}
											source={require("./assets/embalaje.png")}
										/>
									);
								},
							}}
						/>
						<Tabs.Screen
							name="Carrito"
							component={Cart}
							options={{
								tabBarIcon: ({ size }) => {
									return (
										<Image
											style={{
												tintColor: Colors.BattleshipGray,
												width: size,
												height: size,
											}}
											source={require("./assets/shopping-cart.png")}
										/>
									);
								},
							}}
						/>
						<Tabs.Screen
							name="Perfil"
							component={Profile}
							options={{
								tabBarIcon: ({ size }) => {
									return (
										<Image
											style={{
												tintColor: Colors.BattleshipGray,
												width: size,
												height: size,
											}}
											source={require("./assets/user.png")}
										/>
									);
								},
							}}
						/>
						<Tabs.Screen
							name="ProductDetail"
							component={ProductDetail}
							options={
								{
									tabBarIconStyle: {
										display: "none",
									},
									tabBarItemStyle: {
										display: "none",
									}
								}
							}
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
