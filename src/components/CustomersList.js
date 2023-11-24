import {
	Text,
	View,
	StyleSheet,
	ActivityIndicator,
	Platform,
	FlatList,
	TouchableOpacity,
	SafeAreaView,
} from "react-native";
import { useSalesStore } from "../store/";
import Colors from "../res/colors";
import { useEffect } from "react";

const CustomersList = () => {
	const state = useSalesStore((state) => state);

	useEffect(() => {
		if (!state.customers) state.getCustomers();
	}, [state.customers]);

	return (
		<View style={styles.ListContainer}>
			<Text style={styles.TextHeader}>Mis Clientes</Text>
			{state.loading && (
				<ActivityIndicator
					size={Platform.OS === "ios" ? "Large" : 100}
					color={Colors.PigmentGreen}
				/>
			)}
			<View
				style={{
					height: 4,
					width: "100%",
					backgroundColor: Colors.EerieBlack,
					marginBottom: 32,
					borderRadius: 2,
				}}
			/>
			{state.customers && (
				<SafeAreaView
					style={{
						width: "100%",
						padding: 0,
						margin: 0,
						flex: 1,
					}}
				>
					{state.customers.length > 0 ? (
						<FlatList
							data={state.customers}
							renderItem={({ item, index }) => {
								return (
									<TouchableOpacity
										style={styles.cardContainer}
										onPress={() =>
											console.log(`elemento con index ${index} presionado`)
										}
									>
										<Text
											style={styles.cardHeaderText}
										>{`Cliente: ${item.name} - ${item.id}`}</Text>
										<Text
											style={styles.cardInfoText}
										>{`E-mail: ${item.email}`}</Text>
										<Text
											style={styles.cardInfoText}
										>{`Telefonos: ${item.phone?.join(", ")}`}</Text>
										<Text
											style={styles.cardInfoText}
										>{`Direccion: ${item.address}`}</Text>
										<Text
											style={styles.cardInfoText}
										>{`Persona de Contacto: ${item.contact}`}</Text>
									</TouchableOpacity>
								);
							}}
						/>
					) : (
						<Text style={styles.InfoText}>
							Aun no tienes Clientes asignados ...
						</Text>
					)}
				</SafeAreaView>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	ListContainer: {
		width: "100%",
		marginTop: 30,
		paddingVertical: 16,
		borderRadius: 8,
		marginBottom: 32,
	},
	TextHeader: {
		fontSize: 32,
		fontWeight: "700",
		color: Colors.EerieBlack,
		marginBottom: 24,
		textAlign: "center",
	},
	cardContainer: {
		marginBottom: 16,
		width: "100%",
		backgroundColor: Colors.EerieBlack,
		padding: 16,
		borderRadius: 8,
	},
	cardInfoText: {
		color: Colors.WhiteSmoke,
		fontSize: 16,
	},
	cardHeaderText: {
		color: Colors.BattleshipGray,
		fontSize: 18,
		marginBottom: 8,
		fontWeight: "700",
	},
	InfoText: {
		fontSize: 20,
		marginLeft: 16,
		fontWeight: "400",
		color: Colors.EerieBlack,
		marginBottom: 24,
	},
});

export default CustomersList;
