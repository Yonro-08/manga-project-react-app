import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import Login from "components/Login";
import Register from "components/Register";
import ScrollToTop from "components/ScrollToTop";
import { useAuth } from "hooks/zustand/useAuth";
import { useModal } from "hooks/zustand/useModal";
import { getLocalStorage } from "utils/localStorage";
import { Router } from "./navigation/AppNavigation";

import "@fontsource-variable/exo-2";
import "./global.scss";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

const isAuthInitialized = getLocalStorage("isAuthInitialized") === "true";

const App = () => {
	const { setAuthInitialization, setUser } = useAuth();
	const { isLogin, isRegister } = useModal();

	useEffect(() => {
		if (isAuthInitialized) {
			setAuthInitialization(true);
			setUser();
		}
		document.body.setAttribute("data-theme", "dark");
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<ScrollToTop />
				<Router />
			</BrowserRouter>
			{isLogin && <Login />}
			{isRegister && <Register />}
		</QueryClientProvider>
	);
};

export default App;
