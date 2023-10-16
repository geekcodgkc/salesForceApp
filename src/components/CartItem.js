import React from "react";
import { Text, StyleSheet, View } from "react-native";
import CartButtons from "./CartButtons";
import Colors from "../res/colors";

export default function CartItem({ item }) {
	return (
		<View style={styles.cartItemContainer}>
			<Text style={styles.TextHeader}>{`${item.name} - ${item.id}`}</Text>
			<CartButtons item={item} />
			<View style={styles.divider} />
		</View>
	);
}

const styles = StyleSheet.create({
	TextHeader: {
		fontSize: 20,
		marginBottom: 8,
		textAlign: "left",
		fontWeight: "bold",
	},
	cartItemContainer: {
		marginBottom: 16,
	},
	divider: {
		width: "100%",
		height: 4,
		backgroundColor: Colors.EerieBlack,
		marginBottom: 8,
		marginTop: 16,
		borderRadius: 2,
	},
});
