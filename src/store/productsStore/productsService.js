import api from "../../res/api";
import * as Network from "expo-network";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getProductsService = async (set) => {
	set((state) => ({ ...state, loading: true }));

	try {
		const { isInternetReachable } = await Network.getNetworkStateAsync();

		if (isInternetReachable) {
			const { data } = await api.get("/products");
			await AsyncStorage.setItem("offlineProducts", JSON.stringify(data));

			set((state) => ({
				...state,
				products: data,
				filteredProducts: data,
				loading: false,
				error: null,
			}));
		} else {
			const data = AsyncStorage.getItem("offlineProducts");
			set((state) => ({
				...state,
				products: JSON.parse(data),
				filteredProducts: JSON.parse(data),
				loading: false,
				error: null,
			}));
		}
	} catch (error) {
		set((state) => ({ ...state, loading: false, error }));
	}
};

const getDepartmentsSerice = async (set) => {
	set((state) => {
		state.loading = true;
		return state;
	});

	const { isInternetReachable } = await Network.getNetworkStateAsync();

	try {
		if (isInternetReachable) {
			const { data } = await api.get("/departments");
			await AsyncStorage.setItem("offlineDepartments", JSON.stringify(data));

			set((state) => ({
				...state,
				departments: data,
				loading: false,
				error: null,
			}));
		} else {
			const data = await AsyncStorage.getItem("offlineDepartments");
			set((state) => ({
				...state,
				departments: JSON.stringify(data),
				loading: false,
				error: null,
			}));
		}
	} catch (error) {
		set((state) => ({ ...state, loading: false, error }));
	}
};

export { getProductsService, getDepartmentsSerice };
