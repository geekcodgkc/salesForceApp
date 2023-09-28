import { create } from "zustand";
import { login as loginService } from "./Login";

export const useUserStore = create((set) => ({
	token: null,
	loading: false,
	error: null,
	login: async (user, password, navigation) => {
		await loginService(user, password, set, navigation);
	},
}));
