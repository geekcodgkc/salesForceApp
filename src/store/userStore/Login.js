import api from "../../res/api";

const login = async (user, password, set, navigation) => {
	set((state) => ({ ...state, loading: true }));
	try {
		const { data } = await api.post("/user/login", {
			user,
			password,
		});
		set((state) => ({
			...state,
			loading: false,
			token: data.token,
			error: null,
		}));
		navigation.navigate("Inicio");
	} catch (error) {
		console.log(JSON.stringify(error));
		set((state) => ({ ...state, error: "hubo un error", loading: false }));
	}
};

export { login };
