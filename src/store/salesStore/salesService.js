import api from "../../res/api";
import Toast from "react-native-toast-message";

const getSalesService = async (set) => {
	set((state) => ({ ...state, loading: true }));
	try {
		const { data } = await api.get("/orders");
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
		set((state) => ({
			...state,
			loading: false,
			error: "hubo un error al carga los clientes",
		}));
	}
};

const createOrderService = async (set, data) => {};

export { getSalesService, getCustomersService, createOrderService };
