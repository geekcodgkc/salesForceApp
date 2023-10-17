import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, Modal, View } from "react-native";
import Colors from "../res/colors";

export default function CartOrderButtons() {
	const [open, setOpen] = useState(false);

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
							<TouchableOpacity>
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
