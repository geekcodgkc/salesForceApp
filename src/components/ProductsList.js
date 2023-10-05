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
import Colors from "../res/colors";
import { useEffect } from "react";
import { useProductsStore } from "../store";

const ProductsList = ({ productsList, loading, extra }) => {
	const state = useProductsStore((state) => state);

	useEffect(() => {
		console.log("changes");
	}, [state]);

	return (
		<View style={styles.ListContainer}>
			{loading && (
				<ActivityIndicator
					size={Platform.OS === "ios" ? "Large" : 100}
					color={Colors.PigmentGreen}
				/>
			)}
			<SafeAreaView
				style={{
					width: "100%",
					padding: 0,
					margin: 0,
					flex: 1,
				}}
			>
				{productsList.length > 0 ? (
					<FlatList
						extraData={extra}
						data={productsList}
						renderItem={({ item, index }) => {
							console.log(item);
							return (
								<TouchableOpacity
									style={styles.cardContainer}
									onPress={() =>
										console.log(`elemento con index ${index} presionado`)
									}
								>
									<Text style={styles.cardHeaderText}>
										{`Nombre: ${item.name} - ${item.id}`}
									</Text>
									<Text style={styles.cardInfoText}>
										{`Stock: ${item.qty}`}
									</Text>
									<View style={styles.catContainer}>
										<Text style={styles.cardInfoText}>Categorias: </Text>
										{item.department.map((e) => (
											<Text style={styles.cardCatText} key={e}>
												{`${e}`}
											</Text>
										))}
									</View>
								</TouchableOpacity>
							);
						}}
					/>
				) : (
					<Text style={styles.InfoText}>Aun no Productos disponibles ...</Text>
				)}
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({
	ListContainer: {
		width: "100%",
		borderRadius: 8,
		marginBottom: 32,
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
	catContainer: {
		display: "flex",
		gap: 4,
		width: "100%",
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "center",
		borderTopWidth: 2,
		borderTopColor: Colors.WhiteSmoke,
		marginTop: 8,
		paddingTop: 8,
	},
	cardCatText: {
		color: Colors.WhiteSmoke,
		fontSize: 16,
		backgroundColor: Colors.BattleshipGray,
		width: "auto",
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 4,
	},
	cardHeaderText: {
		color: Colors.WhiteSmoke,
		fontSize: 24,
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

export default ProductsList;
