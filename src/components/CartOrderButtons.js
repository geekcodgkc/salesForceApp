import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, Modal, View } from "react-native";
import Colors from "../res/colors";
import { useCartStore, useSalesStore, useUserStore } from "../store";
import Toast from "react-native-toast-message";

export default function CartOrderButtons() {
	const [open, setOpen] = useState(false);
	const { currentClient, cart, clearCart } = useCartStore((state) => state);
	const { userData } = useUserStore((state) => state);
	const { createOrder, getOrders } = useSalesStore((state) => state);

	const handleOrder = () => {
		if (!currentClient) {
			return Toast.show({
				type: "error",
				text1: "Debes Seleccionar Algun Cliente para crear la orden",
			});
		}

		const orderTotal = Object.values(cart).reduce((acc, curr, i) => {
			const total = curr.prices.p1 * curr.amount;
			return acc + total;
		}, 0);

		const data = {
			client: currentClient._id,
			seller: userData._id,
			date: new Date(),
			shippingDate: new Date(),
			orderTotal: orderTotal * 1.16,
			orderBase: orderTotal,
			products: Object.values(cart).map((item) => {
				return {
					product: item._id,
					price: item.prices.p1,
					qty: item.amount,
				};
			}),
			iva: orderTotal * 0.16,
			status: 0,
			shippingAddress: currentClient.shippingAddress,
		};

		createOrder(data, () => {
			getOrders();
			setOpen(false);
			clearCart();
		});
	};

	return (
		<>
			<TouchableOpacity
				style={{
					paddingVertical: 16,
					paddingHorizontal: 32,
					backgroundColor: Colors.EerieBlack,
					borderRadius: 8,
					display: "flex",
					alignSelf: "center",
				}}
				onPress={() => {
					setOpen(true);
				}}
			>
				<Text
					style={{
						color: Colors.WhiteSmoke,
						fontSize: 22,
						fontWeight: "700",
					}}
				>
					Crear Orden
				</Text>
			</TouchableOpacity>
			<Modal
				animationType="slide"
				transparent={true}
				visible={open}
				onRequestClose={() => {
					setOpen(false);
				}}
			>
				<View style={styles.modalOptions}>
					<View style={styles.OptionsContainer}>
						<Text style={styles.TextHeader}>¿Deseas Crear esta Orden?</Text>
						<View style={styles.ButtonsContainer}>
							<TouchableOpacity
								onPress={() => {
									setOpen(false);
								}}
							>
								<Text style={styles.errorButton}>Cancelar</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={handleOrder}>
								<Text style={styles.buttonPrimary}>Aceptar</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		</>
	);
}

const styles = StyleSheet.create({
	errorButton: {
		padding: 8,
		color: "#ed4337",
		fontSize: 18,
		fontWeight: "700",
	},
	buttonPrimary: {
		padding: 8,
		color: Colors.PigmentGreen,
		fontSize: 18,
		fontWeight: "700",
	},
	modalOptions: {
		flex: 1,
		paddingHorizontal: 32,
		paddingVertical: 64,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		alignItems: "center",
		justifyContent: "center",
	},
	OptionsContainer: {
		padding: 16,
		backgroundColor: Colors.WhiteSmoke,
		borderRadius: 8,
	},
	TextHeader: {
		textAlign: "center",
		fontWeight: "700",
		fontSize: 24,
		marginBottom: 32,
	},
	ButtonsContainer: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 16,
		justifyContent: "center",
	},
});
