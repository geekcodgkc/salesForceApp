import { create } from "zustand";
import { getSalesService } from "./salesService";

export const useSalesStore = create((set) => ({
	loading: false,
	error: null,
	orders: null,
	getOrders: async () => {
		await getSalesService(set);
	},
}));
