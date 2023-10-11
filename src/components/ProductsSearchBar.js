import { View, StyleSheet, TextInput } from "react-native";
import Colors from "../res/colors";
import { useState } from "react";
import { useProductsStore } from "../store";

const ProductsSearchBar = () => {
	const state = useProductsStore((state) => state);
	const [search, setSearch] = useState(state.textSearch);

	const handleSearch = (e) => {
		state.setTextSearch(e);
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.TextInput}
				placeholder="Buscar en mis Productos"
				placeholderTextColor={Colors.BattleshipGray}
				onChangeText={(e) => {
					setSearch(e.toString());
					handleSearch(e);
				}}
				value={search}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		marginBottom: 8,
	},
	TextInput: {
		width: "100%",
		fontSize: 22,
		color: Colors.WhiteSmoke,
		padding: 8,
		backgroundColor: Colors.EerieBlack,
		borderRadius: 4,
	},
});

export default ProductsSearchBar;
