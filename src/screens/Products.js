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

const Products = () => {
	const state = useProductsStore((state) => state);

	useEffect(() => {
		if (!state.products) state.getProducts();
	}, []);

	return (
		<View style={styles.container}>
			<ScrollView style={styles.scrollContainer}>
				<Toast />
				<Text style={styles.textHeader}>Mis Productos</Text>
				<View style={styles.divider} />
				<Text>{JSON.stringify(state.products)}</Text>
				<Text>{JSON.stringify(state.error)}</Text>
				<TouchableOpacity
					style={styles.btn}
					onPress={() => {
						state.getProducts();
					}}
				>
					<Text style={styles.btnText}>reload</Text>
				</TouchableOpacity>
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
		padding: 16,
		backgroundColor: Colors.BattleshipGray,
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
