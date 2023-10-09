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

const textSearchService = (search, set) => {
	if (search.trim() === "")
		set((state) => {
			state.filteredProducts = state.products;
			return state;
		});
	set((state) => {
		const filtered = state.products.filter((product) =>
			`${product.name.toLowerCase()} ${product.department
				.join(" ")
				.toLowerCase()} ${product.id.toString().toLowerCase()}`.includes(
				search.toLowerCase(),
			),
		);
		return { ...state, filteredProducts: filtered };
	});
};

export { getProductsService, getDepartmentsSerice, textSearchService };
