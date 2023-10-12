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
import { useProductsStore } from "../store";
import { useEffect, useMemo, useState } from "react";

const ProductsList = ({navigation}) => {
	const state = useProductsStore((state) => state);
	const [fproducts, setFproducts] = useState(state.products || []);

	const filtered = useMemo(() => {
		if (
			state.textSearch === "" &&
			(!state.departments || state.selectedDepartments?.length < 1)
		) {
			return state.products;
		}

		let products = state.products;

		if (state.textSearch && state.textSearch.length > 0) {
			products = products.filter((product) =>
				`${product.name.toLowerCase()} ${product.id
					.toString()
					.toLowerCase()}`.includes(state.textSearch.toLowerCase()),
			);
		}

		if (state.selectedDepartments && state.selectedDepartments.length > 0) {
			products = products.filter((product) => {
				let result = false;

				state.selectedDepartments.forEach((selectedDeparment) => {
					const deparments = product.department.join(" ");
					if (
						deparments.toLowerCase().includes(selectedDeparment.toLowerCase())
					) {
						result = true;
					}
				});

				return result;
			});
		}

		return products;
	}, [state.textSearch, state.selectedDepartments, state.products]);

	useEffect(() => {
		setFproducts(filtered);
	}, [filtered]);

	return (
		<View style={styles.ListContainer}>
			{state.loading && (
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
				{state.products ? (
					<FlatList
						data={fproducts}
						renderItem={({ item, index }) => {
							return (
								<TouchableOpacity
									style={styles.cardContainer}
									onPress={() =>
										navigation.navigate('ProductDetail', item)
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
