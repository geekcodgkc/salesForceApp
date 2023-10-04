import { create } from "zustand";
import { getProductsService } from "./productsService";

export const useProductsStore = create((set) => ({
	loading: false,
	error: null,
	products: null,
	filteredProducts: null,
	getProducts: async () => {
		await getProductsService(set);
	},
}));
