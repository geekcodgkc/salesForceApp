import { useState } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../res/colors";

export default function CategoriItem({
	name,
	handleSelected,
	isActive = false,
}) {
	const [selected, setSelected] = useState(isActive);

	return (
		<TouchableOpacity
			style={selected ? styles.itemSelected : styles.item}
			onPress={() => {
				handleSelected(!selected, name);
				setSelected(!selected);
			}}
		>
			<Text style={styles.itemText}>{name}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	item: {
		width: "100%",
		borderBottomWidth: 1,
		borderBottomColor: Colors.EerieBlack,
		paddingVertical: 8,
		paddingLeft: 4,
	},
	itemSelected: {
		width: "100%",
		paddingVertical: 8,
		borderBottomWidth: 1,
		paddingLeft: 8,
		borderBottomColor: Colors.EerieBlack,
		backgroundColor: Colors.BattleshipGray,
	},
	itemText: {
		fontWeight: "700",
		fontSize: 18,
	},
});
