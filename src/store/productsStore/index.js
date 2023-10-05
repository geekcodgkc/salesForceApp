import { create } from "zustand";
import {
	getProductsService,
	getDepartmentsSerice,
	textSearchService,
} from "./productsService";

export const useProductsStore = create((set) => ({
	loading: false,
	error: null,
	products: null,
	filteredProducts: null,
	departments: null,
	getProducts: async () => {
		await getProductsService(set);
	},
	getDepartments: async () => {
		await getDepartmentsSerice(set);
	},
	textSearch: (search) => {
		textSearchService(search, set);
	},
}));
