import Toast from "react-native-toast-message";
import api from "../../res/api";

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
		await api.post("/logout");
		set((state) => ({
			...state,
			token: null,
			error: null,
		}));
	} catch (error) {
		set((state) => ({
			...state,
			token: null,
			error: null,
		}));
	}
};

export { login, logoutService };
