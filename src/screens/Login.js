import {
	View,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
} from "react-native";
import Colors from "../res/colors";
import Toast from "react-native-toast-message";
import { useEffect, useState } from "react";
import { useUserStore } from "../store/";

const LoginScreen = () => {
	const [user, setUser] = useState("");
	const [password, setpassword] = useState("");
	const UserState = useUserStore((state) => state);

	UserState.offlineLogin();

	useEffect(() => {}, [UserState.error]);

	const handleLogin = () => {
		UserState.login(user, password);
	};

	return (
		<View style={styles.container}>
			<Toast />
			<Text style={styles.Text}>Inicia sesion</Text>
			<Text style={styles.LabelText}>Ingresa tu usuario</Text>
			<TextInput
				style={styles.TextInput}
				placeholder="Usuario..."
				placeholderTextColor={Colors.BattleshipGray}
				onChangeText={(e) => setUser(e.toString().toLocaleUpperCase())}
				value={user}
			/>
			<Text style={styles.LabelText}>Ingresa tu clave de acceso</Text>
			<TextInput
				style={styles.TextInput}
				placeholder="Clave..."
				placeholderTextColor={Colors.BattleshipGray}
				onChangeText={(e) => setpassword(e)}
				secureTextEntry={true}
			/>
			<TouchableOpacity onPress={handleLogin} style={styles.LoginBtn}>
				<Text style={styles.Textbtn}>Ingresa</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.EerieBlack,
		alignItems: "center",
		justifyContent: "center",
		padding: 60,
		gap: 12,
	},
	LoginBtn: {
		marginTop: 48,
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 12,
		width: "80%",
		alignItems: "center",
		backgroundColor: Colors.BattleshipGray,
	},
	Textbtn: {
		fontSize: 24,
		textAlign: "center",
		fontWeight: "bold",
		color: Colors.WhiteSmoke,
	},
	LabelText: {
		fontSize: 22,
		textAlign: "left",
		width: "100%",
		marginTop: 12,
		fontWeight: "bold",
		color: Colors.white,
	},
	Text: {
		fontSize: 35,
		textAlign: "center",
		lineHeight: 65,
		fontWeight: "bold",
		color: Colors.white,
	},
	TextInput: {
		fontSize: 18,
		fontWeight: "bold",
		borderRadius: 12,
		height: 50,
		width: "100%",
		padding: 10,
		backgroundColor: Colors.WhiteSmoke,
	},
});

export default LoginScreen;
