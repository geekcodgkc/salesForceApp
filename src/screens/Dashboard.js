import { View, StyleSheet } from "react-native";
import Colors from "../res/colors";
import { useUserStore } from "../store/userStore";
import Toast from "react-native-toast-message";
import ProfileName from "../components/ProfileName";
import SalesCarousel from "../components/SalesCaousel";
import CustomersList from "../components/CustomersList";

const Dashboard = () => {
	const state = useUserStore((state) => state);

	return (
		<View style={styles.container}>
			<Toast />
			<ProfileName />
			<SalesCarousel />
			<CustomersList />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.WhiteSmoke,
		alignItems: "center",
		padding: 24,
		paddingTop: 40,
		overflow: "scroll",
	},
});

export default Dashboard;
