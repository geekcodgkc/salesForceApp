import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
	Text,
} from "react-native";
import Colors from "../res/colors";
import { useCartStore } from "../store";

export default function CartButtons({ item }) {
	const state = useCartStore((state) => state);

	const handleText = (text) => {
		console.log("change in amount", text, parseInt(text));
		state.setNewAmount(item.id, text.trim() === "" ? 0 : parseInt(text));
	};

	const handleAdd = () => {
		const newAmount = state.cart[item.id].amount + 1;
		state.setNewAmount(item.id, newAmount);
	};

	const hanldeRemove = () => {
		if (state.cart[item.id].amount === 1) {
			state.removeFromCart(item.id);
		} else {
			const newAmount = state.cart[item.id].amount - 1;
			state.setNewAmount(item.id, newAmount);
		}
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={handleAdd}>
				<Ionicons name="add-circle-outline" color={"black"} size={42} />
			</TouchableOpacity>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					keyboardType="numeric"
					value={state.cart[item.id].amount.toString()}
					onChangeText={handleText}
				/>
			</View>
			<TouchableOpacity onPress={hanldeRemove}>
				<Ionicons name="remove-circle-outline" color={"black"} size={42} />
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => {
					state.removeFromCart(item.id);
				}}
				style={styles.removeButton}
			>
				<Text style={styles.removeButtonText}>Remover del Carrito</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		justifyContent: "center",
		flexWrap: "wrap",
		gap: 12,
		alignItems: "center",
		flexDirection: "row",
	},
	inputContainer: {
		borderBlockColor: Colors.EerieBlack,
		borderWidth: 3,
		borderRadius: 8,
		paddingHorizontal: 8,
	},
	input: {
		fontWeight: "700",
		fontSize: 24,
		paddingHorizontal: 16,
	},
	removeButton: {
		width: "100%",
		justifyContent: "center",
		flexDirection: "row",
	},
	removeButtonText: {
		textAlign: "center",
		fontSize: 24,
		fontWeight: "700",
		color: Colors.white,
		backgroundColor: Colors.EerieBlack,
		padding: 8,
		width: "80%",
		borderRadius: 8,
	},
});
