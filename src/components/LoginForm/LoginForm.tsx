import { ChangeEvent, MouseEvent, useState } from "react";

import Button from "components/Button";
import Input from "components/Input";
import { useAuth } from "hooks/zustand/useAuth";
import { useModal } from "hooks/zustand/useModal";
import { authLogin } from "lib/api/auth";
import { setLocalStorage } from "utils/localStorage";

import c from "./LoginForm.module.scss";

function LoginForm() {
	const { setAuthInitialization, setUser } = useAuth();
	const { closeModal } = useModal();
	const [loginValue, setLoginValue] = useState({
		username: "",
		password: "",
	});

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setLoginValue({ ...loginValue, [event.target.name]: event.target.value });
	};

	const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const response = await authLogin(loginValue);
		setLocalStorage("token", response.token);
		setAuthInitialization(true);
		setUser(response);
		closeModal();
	};

	return (
		<form className={c.form}>
			<Input
				onChange={handleChange}
				value={loginValue.username}
				name="username"
				placeholder="*Логин/почта"
				required
			/>
			<Input
				onChange={handleChange}
				value={loginValue.password}
				name="password"
				placeholder="*Пароль"
				type="password"
				required
			/>
			<span className={c.forgot}>Забыли пароль??</span>
			<Button onClick={handleClick}>Войти</Button>
		</form>
	);
}

export default LoginForm;
