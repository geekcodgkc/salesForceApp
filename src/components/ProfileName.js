import { Text, View, StyleSheet } from "react-native";
import { useUserStore } from "../store/userStore";

const ProfileName = () => {
	const state = useUserStore((state) => state);

	return (
		<View style={styles.TextContainer}>
			<Text style={styles.TextHeader}>Hola! {state.userData.name}</Text>
			<Text style={styles.TextBottom}>este es tu Dashboard</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	TextContainer: {
		width: "100%",
	},
	TextHeader: {
		fontSize: 36,
		textAlign: "left",
		fontWeight: "bold",
	},
	TextBottom: {
		fontSize: 16,
		textAlign: "left",
	},
});

export default ProfileName;
