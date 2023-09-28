import { View, StyleSheet, Text } from "react-native";
import Colors from "../res/colors";
import { useUserStore } from "../store/userStore";

const Dashboard = ({ navigation }) => {
	const state = useUserStore((state) => state);
	console.log(state);

	if (!state.token) return navigation.navigate("Login");

	return (
		<View style={styles.container}>
			<Text style={styles.Text}>this is the initial test</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.WhiteSmoke,
		alignItems: "center",
		justifyContent: "center",
		padding: 60,
	},
	Text: {
		fontSize: 50,
		textAlign: "center",
		lineHeight: 65,
		fontWeight: "bold",
	},
});

export default Dashboard;
