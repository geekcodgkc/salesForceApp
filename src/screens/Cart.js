import { useEffect } from "react";
import { View, StyleSheet, ScrollView, Text, FlatList } from "react-native";
import Colors from "../res/colors";
import { useCartStore, useSalesStore } from "../store/";
import Toast from "react-native-toast-message";
import CartItem from "../components/CartItem";

const Cart = () => {
	const state = useSalesStore((state) => state);
	const { cart } = useCartStore((state) => state);

	useEffect(() => {
		if (!state.customers) state.getCustomers();
	}, [state.customers]);

	return (
		<View style={styles.container}>
			<ScrollView style={styles.scrollContainer}>
				<Toast />
				<Text style={styles.TextHeader}>Carrito De Compras</Text>
				<View style={styles.divider} />
				<FlatList
					data={Object.values(cart)}
					renderItem={({ item }) => {
						return <CartItem item={item} />;
					}}
				/>
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
	TextHeader: {
		fontSize: 24,
		textAlign: "left",
		fontWeight: "bold",
	},
	divider: {
		width: "100%",
		height: 4,
		backgroundColor: Colors.EerieBlack,
		marginBottom: 16,
		marginTop: 16,
		borderRadius: 2,
	},
});

export default Cart;
