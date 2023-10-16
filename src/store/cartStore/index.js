import { create } from "zustand";

export const useCartStore = create((set) => ({
	loading: false,
	error: null,
	cart: {},
	addToCart: (item) => {
		set((state) => {
			const newCart = {
				...state.cart,
			};
			newCart[item.id] = item;
			return { ...state, cart: newCart };
		});
	},
	removeFromCart: (id) => {
		set((state) => {
			const newCart = {};

			Object.entries(state.cart).forEach((item) => {
				if (item[0] === id) return;
				newCart[item[0]] = item[1];
			});

			return { ...state, cart: newCart };
		});
	},
}));