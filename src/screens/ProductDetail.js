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
import CartButtons from "../components/CartButtons";

export default function ProductDetail({ route, navigation }) {
	const { params: item } = route;
	const state = useCartStore((state) => state);

	const { cart, draft } = state;

	let qty = item.qty;

	if (draft[item.id] && typeof draft[item.id] === "number") {
		qty -= draft[item.id];
	}

	if (cart[item.id]) {
		qty += cart[item.id].amount;
	}
	return (
		<View style={styles.container}>
			<ScrollView style={styles.scrollContainer}>
				<Text style={styles.textHeader}>{item.name}</Text>
				<View style={styles.divider} />
				<Text style={styles.textBody}>{`Cantidad disponible: ${qty}`}</Text>
				<Text
					style={styles.textBody}
				>{`Precio Unitario: ${item.prices.p1}$`}</Text>
				{!state.cart?.[item.id] ? (
					<TouchableOpacity
						onPress={() => {
							state.addToCart(item);
						}}
						style={styles.addToCartButton}
					>
						<Text style={styles.addToCartButtonText}>Agregar al Carro</Text>
						<Ionicons name="cart-outline" size={32} color={"white"} />
					</TouchableOpacity>
				) : (
					<CartButtons item={item} />
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
	addToCartButton: {
		marginTop: 42,
		alignSelf: "center",
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
		alignItems: "center",
		backgroundColor: Colors.EerieBlack,
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 8,
	},
	addToCartButtonText: {
		fontSize: 18,
		fontWeight: "700",
		color: Colors.white,
	},
});
