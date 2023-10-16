import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../res/colors";

export default function CartButton({ navigation }) {
	return (
		<TouchableOpacity
			style={styles.button}
			onPress={() => {
				navigation.navigate("Carrito");
			}}
		>
			<Ionicons color={"white"} name="cart-outline" size={42} />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		width: 70,
		height: 70,
		position: "absolute",
		backgroundColor: Colors.EerieBlack,
		borderRadius: 35,
		justifyContent: "center",
		alignItems: "center",
		zIndex: 10,
		bottom: 15,
		right: 15,
	},
});
