import { getLocalStorage } from "./localStorage";

export const getToken = () => {
	return getLocalStorage("token");
};
