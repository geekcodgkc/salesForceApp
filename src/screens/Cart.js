import { useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	ScrollView,
	Text,
	FlatList,
	Modal,
	TouchableOpacity,
} from "react-native";
import Colors from "../res/colors";
import { useCartStore, useSalesStore } from "../store/";
import Toast from "react-native-toast-message";
import CartItem from "../components/CartItem";
import CartOrderButtons from "../components/CartOrderButtons";

const Cart = () => {
	const state = useSalesStore((state) => state);
	const { cart, currentClient, setCurrentClient } = useCartStore(
		(state) => state,
	);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!state.customers) state.getCustomers();
	}, [state.customers]);

	return (
		<View style={styles.container}>
			<ScrollView style={styles.scrollContainer}>
				<Toast />
				<Text style={styles.TextHeader}>Carrito De Compras</Text>
				<View style={styles.divider} />
				<TouchableOpacity
					style={styles.selecClientButton}
					onPress={() => {
						setOpen(true);
					}}
				>
					{currentClient ? (
						<Text
							style={styles.clientSelected}
						>{`Cliente seleccionado: ${currentClient.name}`}</Text>
					) : (
						<Text style={styles.clientUnselected}>Selecciona un Cliente</Text>
					)}
				</TouchableOpacity>
				<FlatList
					data={Object.values(cart)}
					renderItem={({ item }) => {
						return item ? <CartItem item={item} /> : "";
					}}
				/>
				<Modal
					animanionType="slide"
					transparent={true}
					visible={open}
					onRequestClose={() => {
						setOpen(false);
					}}
				>
					<View style={styles.modalContainerOpacity}>
						<View style={styles.modalContainer}>
							<Text style={styles.TextHeader}>Escoge un Cliente</Text>
							{state.customers?.map((e) => {
								return (
									<TouchableOpacity
										key={e._id}
										style={styles.clientItem}
										onPress={() => {
											setCurrentClient(e);
											setOpen(false);
										}}
									>
										<Text
											style={styles.clientItemText}
										>{`Razón Social: ${e.name}`}</Text>
										<Text style={styles.clientItemText}>{`Rif: ${e.rif}`}</Text>
										<Text
											style={styles.clientItemText}
										>{`Dirección: ${e.address}`}</Text>
									</TouchableOpacity>
								);
							})}
							<TouchableOpacity
								style={styles.closeButton}
								onPress={() => {
									setOpen(false);
								}}
							>
								<Text style={styles.closeButtonText}>Cerrar</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
				<Text
					style={{
						marginBottom: 16,
						fontSize: 24,
						fontWeight: "700",
					}}
				>
					{`Subtotal: ${Object.values(cart).reduce((acc, curr, i) => {
						const total = curr.prices.p1 * curr.amount;
						return acc + total;
					}, 0)}$`}
				</Text>
				<CartOrderButtons />
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
	modalContainerOpacity: {
		flex: 1,
		paddingHorizontal: 32,
		paddingVertical: 64,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContainer: {
		padding: 16,
		backgroundColor: Colors.WhiteSmoke,
		borderRadius: 8,
		height: "100%",
	},
	closeButton: {
		position: "relative",
		paddingHorizontal: 16,
		paddingVertical: 8,
		backgroundColor: Colors.EerieBlack,
		borderRadius: 8,
		marginTop: 24,
		alignSelf: "center",
	},
	closeButtonText: {
		color: Colors.WhiteSmoke,
		fontSize: 24,
		textAlign: "center",
		fontWeight: "700",
	},
	clientItem: {
		padding: 8,
		backgroundColor: Colors.BattleshipGray,
		marginTop: 16,
		borderRadius: 8,
	},
	clientItemText: {
		fontSize: 18,
		fontWeight: "500",
		color: Colors.EerieBlack,
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
	selecClientButton: {
		padding: 8,
		borderColor: Colors.EerieBlack,
		borderWidth: 3,
		borderRadius: 8,
		width: "100%",
		marginBottom: 16,
	},
	clientUnselected: {
		fontWeight: "700",
		color: Colors.BattleshipGray,
		textAlign: "center",
		fontSize: 22,
	},
	clientSelected: {
		fontWeight: "700",
		color: Colors.EerieBlack,
		textAlign: "center",
		fontSize: 22,
	},
});

export default Cart;
