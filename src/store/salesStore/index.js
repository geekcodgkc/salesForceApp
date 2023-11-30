import { create } from "zustand";
import {
	getCustomersService,
	getSalesService,
	createOrderService,
} from "./salesService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useSalesStore = create((set) => ({
	loading: false,
	error: null,
	orders: null,
	customers: null,
	offlineOrders: [],
	getOrders: async () => {
		await getSalesService(set);
	},
	getCustomers: async () => {
		await getCustomersService(set);
	},
	createOrder: async (data, cb) => {
		await createOrderService(set, data, cb);
	},
	getOfflineOrders: async () => {
		const orders = await AsyncStorage.getItem("offlineOrders");
		if (orders) {
			set((state) => ({ ...state, offlineOrders: JSON.parse(orders) }));
		}
	},
}));
