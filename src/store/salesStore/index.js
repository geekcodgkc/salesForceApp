import { create } from "zustand";
import {
	getCustomersService,
	getSalesService,
	createOrderService,
} from "./salesService";

export const useSalesStore = create((set) => ({
	loading: false,
	error: null,
	orders: null,
	customers: null,
	getOrders: async () => {
		await getSalesService(set);
	},
	getCustomers: async () => {
		await getCustomersService(set);
	},
	createOrder: async (data) => {
		await createOrderService(set, data);
	},
}));
