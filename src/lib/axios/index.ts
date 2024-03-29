import axios from "axios";
import { getLocalStorage } from "utils/localStorage";

const url = process.env.REACT_APP_PORT || "http://localhost:8080";

const instance = axios.create({
	baseURL: `${url}/api`,
});

instance.interceptors.request.use((config) => {
	config.headers.Authorization = getLocalStorage("token");

	return config;
});

export default instance;
