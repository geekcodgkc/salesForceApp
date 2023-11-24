import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Colors from "../res/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OfflineOrders() {
	const [orders, setOrders] = useState(null);

	AsyncStorage.getItem("offlineOrders").then((e) => {
		console.log("order ofline", e);
		setOrders(e);
	});

	return (
		<View style={styles.container}>
			{orders && <Text>{JSON.stringify(orders)}</Text>}
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
