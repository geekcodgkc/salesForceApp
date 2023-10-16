import React from "react";
import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import Colors from "../res/colors";
import { useCartStore } from "../store";
import Ionicons from "@expo/vector-icons/Ionicons";
import CartButton from "../components/CartButton";

export default function ProductDetail({ route, navigation }) {
	const { params: item } = route;
	const state = useCartStore((state) => state);

	console.log(item);

	return (
		<View style={styles.container}>
			<ScrollView style={styles.scrollContainer}>
				<Text style={styles.textHeader}>{item.name}</Text>
				<View style={styles.divider} />
				<Text
					style={styles.textBody}
				>{`Cantidad disponible: ${item.qty}`}</Text>
				{!state.cart?.[item.id] ? (
					<TouchableOpacity
						onPress={() => {
							state.addToCart(item);
						}}
					>
						<Text>Agregar al Carro</Text>
						<Ionicons name="cart-outline" size={32} />
					</TouchableOpacity>
				) : (
					<TouchableOpacity
						onPress={() => {
							state.removeFromCart(item.id);
						}}
					>
						<Text>Sumar Mas</Text>
					</TouchableOpacity>
				)}
			</ScrollView>
			{Object.keys(state.cart).length > 0 && (
				<CartButton navigation={navigation} />
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.WhiteSmoke,
		paddingTop: 40,
	},
	divider: {
		width: "100%",
		height: 4,
		backgroundColor: Colors.EerieBlack,
		marginBottom: 8,
		marginTop: 16,
		borderRadius: 2,
	},
	scrollContainer: {
		flex: 1,
		padding: 24,
	},
	textHeader: {
		fontSize: 24,
		textAlign: "left",
		fontWeight: "bold",
	},
	textBody: {
		fontSize: 24,
		textAlign: "left",
		fontWeight: "bold",
	},
});
