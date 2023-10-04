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
		}));
	} catch (error) {
		set((state) => ({ ...state, loading: false, error }));
	}
};

export { getProductsService };
