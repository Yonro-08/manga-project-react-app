import { create } from "zustand";

interface useModalProps {
	isLogin: boolean;
	isRegister: boolean;
	openModal: () => void;
	closeModal: () => void;
	authRedirect: () => void;
}

export const useModal = create<useModalProps>((set) => ({
	isLogin: false,
	isRegister: false,
	openModal: () =>
		set(() => {
			document.body.classList.add("is-modal");
			return { isLogin: true };
		}),
	closeModal: () =>
		set(() => {
			document.body.classList.remove("is-modal");
			return { isLogin: false, isRegister: false };
		}),
	authRedirect: () =>
		set((state) => {
			if (state.isLogin) {
				return { isLogin: false, isRegister: true };
			}
			if (state.isRegister) {
				return { isLogin: true, isRegister: false };
			}
			return {};
		}),
}));
