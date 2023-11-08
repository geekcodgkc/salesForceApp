import { create } from "zustand";
import { login as loginService, logoutService, offlineLogin } from "./Login";

export const useUserStore = create((set) => ({
	token: null,
	loading: false,
	error: null,
	userData: null,
	login: async (user, password) => {
		await loginService(user, password, set);
	},
	logout: async () => {
		await logoutService(set);
	},
	offlineLogin: async () => {
		await offlineLogin(set);
	},
}));
