import {
	Text,
	View,
	StyleSheet,
	ActivityIndicator,
	Platform,
} from "react-native";
import { useSalesStore } from "../store/";
import Colors from "../res/colors";
import { useEffect } from "react";

const SalesCarousel = () => {
	const state = useSalesStore((state) => state);

	useEffect(() => {
		if (!state.orders && !state.loading) state.getOrders();
	}, [state.orders]);

	console.log(state.orders);

	return (
		<View style={styles.CarouselContainer}>
			<Text style={styles.TextHeader}>Mis Ordenes</Text>
			{state.loading && (
				<ActivityIndicator
					size={Platform.OS === "ios" ? "Large" : 100}
					color={Colors.PigmentGreen}
				/>
			)}
			{state.orders && (
				<View
					style={{
						width: "100%",
						paddingHorizontal: 16,
						margin: 0,
					}}
				>
					{state.orders.length > 0 ? (
						<>
							{state.orders.slice(0, 3).map((e) => (
								<View
									style={{
										marginBottom: 8,
										paddingBottom: 4,
										borderBottomWidth: 2,
										borderColor: "white",
									}}
								>
									<Text
										style={styles.BodyText}
									>{`numero de Orden: ${e.orderNumber}`}</Text>
									<Text
										style={styles.BodyText}
									>{`Ciente: ${e.client.name}`}</Text>
									<Text
										style={styles.BodyText}
									>{`Total: ${e.orderTotal}$`}</Text>
								</View>
							))}
						</>
					) : (
						<Text style={styles.InfoText}>Aun no tienes ordenes ...</Text>
					)}
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	CarouselContainer: {
		width: "100%",
		marginTop: 30,
		backgroundColor: Colors.EerieBlack,
		paddingVertical: 16,
		borderRadius: 8,
		minHeight: 180,
	},
	TextHeader: {
		fontSize: 24,
		marginLeft: 16,
		fontWeight: "600",
		color: Colors.WhiteSmoke,
		marginBottom: 24,
	},
	InfoText: {
		fontSize: 20,
		marginLeft: 16,
		fontWeight: "400",
		color: Colors.WhiteSmoke,
		marginBottom: 24,
	},
	BodyText: {
		color: "white",
	},
});

export default SalesCarousel;
