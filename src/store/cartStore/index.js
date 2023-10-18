import { create } from "zustand";

export const useCartStore = create((set) => ({
	loading: false,
	error: null,
	cart: {},
	currentClient: null,
	addToCart: (item) => {
		set((state) => {
			item.amount = 1;
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
	setNewAmount: (id, amount) => {
		set((state) => {
			const newCart = { ...state.cart };
			newCart[id].amount =
				state.cart[id].qty < amount ? state.cart[id].qty : amount;

			return { ...state, cart: newCart };
		});
	},
	setCurrentClient: (client) => {
		set((state) => ({ ...state, currentClient: client }));
	},
	clearCart: () => {
		set((state) => ({ ...state, cart: {}, currentClient: null }));
	},
}));
