import { NavigateFunction } from "react-router-dom";

import { getLocalStorage } from "./localStorage";

export const checkAuth = (
	navigate: NavigateFunction,
	openModal: () => void
) => {
	const isAuthInitialized: boolean =
		getLocalStorage("isAuthInitialized") === "true";
	if (!isAuthInitialized) {
		console.log(isAuthInitialized);
		navigate("/");
		openModal();
	}
	return;
};
