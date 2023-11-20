import { create } from "zustand";
import { getSocket } from "../../res/socket";

export const useCartStore = create((set) => ({
	loading: false,
	error: null,
	cart: {},
	currentClient: null,
	draft: {},
	setDraft: (draft) => {
		set((state) => ({ ...state, draft }));
	},
	addToCart: async (item) => {
		set((state) => {
			item.amount = 1;
			const newCart = {
				...state.cart,
			};
			newCart[item.id] = item;
			const socket = getSocket();

			socket.emit("updateDraft", {
				qty: 1,
				id: item.id,
			});

			return { ...state, cart: newCart };
		});
	},
	removeFromCart: (id) => {
		set((state) => {
			const socket = getSocket();
			socket.emit("updateDraft", {
				qty: parseInt(`-${state.cart[id].amount}`),
				id,
			});

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
			const newAmount =
				state.cart[id].qty < amount ? state.cart[id].qty : amount;

			const newCart = { ...state.cart };
			const socket = getSocket();

			socket.emit("updateDraft", {
				qty: newAmount - state.cart[id].amount,
				id,
			});

			newCart[id].amount = newAmount;

			return { ...state, cart: newCart };
		});
	},
	setCurrentClient: (client) => {
		set((state) => ({ ...state, currentClient: client }));
	},
	clearCart: () => {
		set((state) => {
			const socket = getSocket();

			Object.entries(state.cart).forEach((item) => {
				socket.emit("updateDraft", {
					id: item[0],
					qty: parseInt(`-${item[1].amount}`),
				});
			});

			return { ...state, cart: {}, currentClient: null };
		});
	},
}));
