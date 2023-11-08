import Toast from "react-native-toast-message";
import api from "../../res/api";
import { initSocket, socketHandler } from "../../res/socket";
import AsyncStorage from "@react-native-async-storage/async-storage";

const login = async (user, password, set) => {
	set((state) => ({ ...state, loading: true, error: null }));
	try {
		const { data } = await api.post("/user/login", {
			user,
			password,
		});

		set((state) => ({
			...state,
			userData: {
				...data.userData,
				isAdmin: data.isAdmin,
				clientID: data.clientID,
			},
			loading: false,
			token: data.token,
			error: null,
		}));

		await AsyncStorage.setItem("data", JSON.stringify(data));

		// iniciamos el socket y pasamos la instancia a la funcion que
		// maneja y escucha los eventos del socket
		const socket = initSocket({
			readID: data.userData._id,
			roomID: data.clientID,
		});
		socketHandler(socket);
	} catch (error) {
		if (error.response && error.response.status === 500) {
			set((state) => ({
				...state,
				error: "Usuario o Clave Invalida",
				loading: false,
			}));

			Toast.show({
				type: "error",
				text1: "Usuario o Clave Invalida",
			});

			return;
		}

		Toast.show({
			type: "error",
			text1: "Hubo un error de Red, intente mas tarde",
		});

		set((state) => ({
			...state,
			error: "Hubo un error de Red, intente mas tarde",
			loading: false,
		}));
	}
};

const logoutService = async (set) => {
	try {
		await AsyncStorage.removeItem("data");
		await api.post("/logout");
		set((state) => ({
			...state,
			token: null,
			error: null,
			userData: null,
		}));
	} catch (error) {
		set((state) => ({
			...state,
			token: null,
			error: null,
			userData: null,
		}));
	}
};

const offlineLogin = async (set) => {
	try {
		const storage = await AsyncStorage.getItem("data");
		if (storage) {
			const data = JSON.parse(storage);
			set((state) => ({
				...state,
				userData: {
					...data.userData,
					isAdmin: data.isAdmin,
					clientID: data.clientID,
				},
				loading: false,
				token: data.token,
				error: null,
			}));
		}
	} catch (error) {
		console.log("hubo un error", error);
	}
};

export { login, logoutService, offlineLogin };
