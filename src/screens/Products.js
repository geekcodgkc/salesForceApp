import {
	View,
	StyleSheet,
	ScrollView,
	Text,
	TouchableOpacity,
} from "react-native";
import Colors from "../res/colors";
import Toast from "react-native-toast-message";
import { useEffect } from "react";
import { useProductsStore } from "../store/";
import ProductsList from "../components/ProductsList";

const Products = () => {
	const state = useProductsStore((state) => state);

	useEffect(() => {
		if (!state.products) {
			state.getProducts();
			state.getDepartments();
		}
		console.log(state);
	}, []);

	return (
		<View style={styles.container}>
			<ScrollView style={styles.scrollContainer}>
				<Toast />
				<Text style={styles.textHeader}>Mis Productos</Text>
				<View style={styles.divider} />
				{!state.products && state.error && (
					<View style={styles.errorContainer}>
						<Text style={styles.errorContainerText}>
							Hubo un error al consultar los productos por favor reintente mas
							tarde
						</Text>
						<TouchableOpacity
							style={styles.btn}
							onPress={() => {
								state.getProducts();
								state.getDepartments();
								console.log("press");
							}}
						>
							<Text style={styles.btnText}>Reintentar</Text>
						</TouchableOpacity>
					</View>
				)}
				{state.products && !state.error && <ProductsList />}
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
	btn: {
		width: "70%",
		marginTop: 24,
		padding: 16,
		backgroundColor: Colors.BattleshipGray,
		borderRadius: 8,
		alignItems: "center",
	},
	btnText: {
		color: Colors.WhiteSmoke,
		fontSize: 18,
		fontWeight: "700",
	},
	errorContainer: {
		alignItems: "center",
	},
	errorContainerText: {
		fontWeight: "700",
		textAlign: "center",
		fontSize: 24,
	},
	textHeader: {
		fontSize: 36,
		textAlign: "left",
		fontWeight: "bold",
	},
	divider: {
		width: "100%",
		height: 4,
		backgroundColor: Colors.EerieBlack,
		marginBottom: 32,
		marginTop: 16,
		borderRadius: 2,
	},
});

export default Products;
