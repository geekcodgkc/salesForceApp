import api from "../../res/api";

const getSalesService = async (set) => {
	set((state) => ({ ...state, loading: true }));
	try {
		const { data } = await api.get("/orders");
		console.log(data);
		set((state) => ({ ...state, loading: false, orders: data }));
	} catch (error) {
		set((state) => ({
			...state,
			loading: false,
			error: "hubo un error al carga las ordernes",
		}));
	}
};

const getCustomersService = async (set) => {
	set((state) => ({ ...state, loading: true }));
	try {
		const { data } = await api.get("/customer");
		set((state) => ({ ...state, loading: false, customers: data }));
	} catch (error) {
		console.log(error);
		set((state) => ({
			...state,
			loading: false,
			error: "hubo un error al carga los clientes",
		}));
	}
};

export { getSalesService, getCustomersService };
