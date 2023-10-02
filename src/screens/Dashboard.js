import { View, StyleSheet, Text } from "react-native";
import Colors from "../res/colors";
import { useUserStore } from "../store/userStore";
import Toast from "react-native-toast-message";

const Dashboard = () => {
	const state = useUserStore((state) => state);
	console.log(state);

	return (
		<View style={styles.container}>
			<Toast />
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
