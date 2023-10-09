import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	Modal,
	ScrollView,
} from "react-native";
import Colors from "../res/colors";
import { useProductsStore } from "../store";
import { useEffect, useState } from "react";
import CategoriItem from "./CategoriItem";

const CategoriesList = () => {
	const state = useProductsStore((state) => state);
	const [open, setOpen] = useState(false);
	const departments = new Set();

	useEffect(() => {
		if (!state.departments) state.getDepartments();
	}, [state]);

	const handleSelect = (status, name) => {
		if (status) {
			departments.add(name);
		} else {
			departments.delete(name);
		}
		console.log(departments);
	};

	const handleSetCat = () => {
		const c = [];
		departments.forEach((e) => {
			c.push(e);
		});
		state.setSelectedDepartments(c);
		setOpen(false);
	};

	return (
		<View style={styles.catContainer}>
			<TouchableOpacity
				style={styles.btn}
				onPress={() => {
					setOpen(true);
				}}
			>
				<Text style={styles.btnText}>Filtrar por Categorias</Text>
			</TouchableOpacity>
			<View style={styles.CategorieTagContainer}>
				{state.selectedDepartments?.map((name) => {
					return (
						<View key={name} style={styles.CategorieTag}>
							<Text style={styles.CategorieTagName}>{name}</Text>
						</View>
					);
				})}
			</View>
			<Modal
				animationType="slide"
				transparent={true}
				visible={open}
				onRequestClose={() => {
					setOpen(false);
				}}
				opac
			>
				<View style={styles.modalOptions}>
					<View style={styles.OptionsContainer}>
						<ScrollView style={{ width: "100%" }}>
							{state.departments?.map((d) => {
								let isActive = false;
								state.selectedDepartments?.forEach((e) => {
									if (e === d.name) {
										isActive = true;
									}
								});

								if (isActive) {
									departments.add(d.name);
									console.log(departments);
								}

								return (
									<CategoriItem
										key={d._id}
										name={d.name}
										isActive={isActive}
										handleSelected={handleSelect}
									/>
								);
							})}
						</ScrollView>
						<View style={styles.buttonsContainer}>
							<TouchableOpacity onPress={handleSetCat}>
								<Text style={styles.btnPrimary}>aplicar</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									setOpen(false);
								}}
							>
								<Text style={styles.btnError}>cancelar</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	buttonsContainer: {
		alignItems: "center",
		width: "100%",
		justifyContent: "space-evenly",
		flexWrap: "wrap",
		paddingTop: 8,
		marginTop: 8,
		flexDirection: "row",
	},
	btnPrimary: {
		padding: 8,
		color: Colors.PigmentGreen,
		fontSize: 18,
		fontWeight: "700",
	},
	btnError: { padding: 8, color: "#ed4337", fontSize: 18, fontWeight: "700" },
	catContainer: {
		marginBottom: 16,
	},
	CategorieTagContainer: {
		width: "100%",
		flexWrap: "wrap",
		gap: 8,
		marginTop: 8,
		alignItems: "center",
		flexDirection: "row",
	},
	CategorieTag: {
		backgroundColor: Colors.BattleshipGray,
		padding: 8,
		borderRadius: 8,
	},
	CategorieTagName: {
		color: Colors.white,
		fontWeight: "600",
	},
	btn: {
		width: "70%",
		padding: 8,
		backgroundColor: Colors.EerieBlack,
		borderRadius: 8,
		alignItems: "center",
	},
	btnText: {
		color: Colors.WhiteSmoke,
		fontSize: 18,
		fontWeight: "700",
	},
	modalOptions: {
		flex: 1,
		paddingHorizontal: 32,
		paddingVertical: 64,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	OptionsContainer: {
		padding: 16,
		backgroundColor: Colors.WhiteSmoke,
		borderRadius: 8,
	},
});

export default CategoriesList;
