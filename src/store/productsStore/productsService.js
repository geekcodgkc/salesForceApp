import api from "../../res/api";

const getProductsService = async (set) => {
	set((state) => {
		state.loading = true;
		return state;
	});

	try {
		const { data } = await api.get("/products");
		set((state) => ({
			...state,
			products: data,
			filteredProducts: data,
			loading: false,
			error: null,
		}));
		console.log(data);
	} catch (error) {
		console.log(error);
		set((state) => ({ ...state, loading: false, error }));
	}
};

const getDepartmentsSerice = async (set) => {
	set((state) => {
		state.loading = true;
		return state;
	});

	try {
		const { data } = await api.get("/departments");
		set((state) => ({
			...state,
			departments: data,
			loading: false,
			error: null,
		}));
	} catch (error) {
		set((state) => ({ ...state, loading: false, error }));
	}
};

export { getProductsService, getDepartmentsSerice };
