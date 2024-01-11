export const getLocalStorage = (key: string) => {
	const data = localStorage.getItem(key) || "";
	if (!data) return;
	return JSON.parse(data);
};

export const setLocalStorage = (key: string, value: string | number) => {
	return localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key: string) => {
	return localStorage.removeItem(key);
};
