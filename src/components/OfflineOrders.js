import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Colors from "../res/colors";
import { useProductsStore, useSalesStore, useUserStore } from "../store";

export default function OfflineOrders() {
	const { offlineOrders, getOfflineOrders, customers } = useSalesStore(
		(state) => state,
	);
	const { products } = useProductsStore((state) => state);

	console.log(products);

	useEffect(() => {
		getOfflineOrders();
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.textHeader}>Ordenes en Borrador</Text>
			{offlineOrders.map((e, i) => {
				const client = customers.find((customer) => customer._id === e.client);

				return (
					<View key={`${i}-${Math.random()}`}>
						<Text>{`Cliente: ${client.name}`}</Text>
						<View style={styles.div} />
						<Text>Descripcion de la orden</Text>
						{e.products.map((p) => {
							const product = products.find((prdct) => prdct._id === p.product);
							console.log(p);
							return (
								<Text>{`${p.qty} X ${product.name} - ${product.id}`}</Text>
							);
						})}
					</View>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	div: {
		width: "100%",
		height: 1.5,
		backgroundColor: Colors.EerieBlack,
		marginVertical: 8,
	},
	container: {
		width: "100%",
		justifyContent: "center",
		flexWrap: "wrap",
		gap: 12,
		alignItems: "center",
		flexDirection: "row",
		marginTop: 18,
	},
	inputContainer: {
		borderBlockColor: Colors.EerieBlack,
		borderWidth: 3,
		borderRadius: 8,
		paddingHorizontal: 8,
	},
	textHeader: {
		fontSize: 24,
		fontWeight: "700",
	},
});
