import {
	View,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Text,
} from "react-native";
import Colors from "../res/colors";
import { useUserStore } from "../store/";
import Toast from "react-native-toast-message";

const Profile = () => {
	const state = useUserStore((state) => state);

	return (
		<View style={styles.container}>
			<ScrollView style={styles.scrollContainer}>
				<Toast />
				<TouchableOpacity
					style={styles.btn}
					onPress={() => {
						state.logout();
					}}
				>
					<Text>logout</Text>
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
		width: "70%",
		marginTop: 24,
		padding: 16,
		backgroundColor: Colors.BattleshipGray,
		borderRadius: 8,
		alignItems: "center",
	},
});

export default Profile;
