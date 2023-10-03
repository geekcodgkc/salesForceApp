import { View, StyleSheet, ScrollView } from "react-native";
import Colors from "../res/colors";
import { useUserStore } from "../store/userStore";
import Toast from "react-native-toast-message";
import ProfileName from "../components/ProfileName";
import SalesCarousel from "../components/SalesCaousel";
import CustomersList from "../components/CustomersList";

const Cart = () => {
	const state = useUserStore((state) => state);

	return (
		<View style={styles.container}>
			<ScrollView style={styles.scrollContainer}>
				<Toast />
				<ProfileName />
				<SalesCarousel />
				<CustomersList />
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.WhiteSmoke,
		paddingTop: 40,
	},
	scrollContainer: {
		flex: 1,
		padding: 24,
	},
});

export default Cart;
