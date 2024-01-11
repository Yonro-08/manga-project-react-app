import { create } from "zustand";

import { getMe } from "lib/api/auth";
import { UserData } from "types/Auth";
import { setLocalStorage } from "utils/localStorage";

interface useAuthProps {
	user: null | UserData;
	isAuth: boolean;
	setAuthInitialization: (value: boolean) => void;
	setUser: (value?: UserData) => void;
}

export const useAuth = create<useAuthProps>((set) => ({
	user: null,
	isAuth: false,
	setAuthInitialization: (value) =>
		set(() => {
			setLocalStorage("isAuthInitialized", value.toString());
			return { isAuth: value };
		}),
	setUser: async (value) => {
		if (value) {
			return set({ user: value });
		}

		const response = await getMe();
		return set({ user: response });
	},
}));
