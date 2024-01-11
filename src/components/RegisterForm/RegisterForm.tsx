import { ChangeEvent, MouseEvent, useState } from "react";

import Button from "components/Button";
import Input from "components/Input";
import { useAuth } from "hooks/zustand/useAuth";
import { authRegister } from "lib/api/auth";
import { setLocalStorage } from "utils/localStorage";

import c from "./RegisterForm.module.scss";

interface RegisterForm {}

function RegisterForm() {
	const { setUser } = useAuth();
	const [registerValue, setRegisterValue] = useState({
		username: "",
		password: "",
		repeatPassword: "",
	});

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setRegisterValue({
			...registerValue,
			[event.target.name]: event.target.value,
		});
	};

	const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const response = await authRegister(registerValue);
		setLocalStorage("token", response.token);
		setUser(response);
	};

	return (
		<form className={c.form}>
			<Input
				onChange={handleChange}
				value={registerValue.username}
				name="username"
				placeholder="*Никнейм"
				required
			/>
			<Input
				onChange={handleChange}
				value={registerValue.password}
				placeholder="*Пароль"
				name="password"
				type="password"
				required
			/>
			<Input
				onChange={handleChange}
				value={registerValue.repeatPassword}
				placeholder="*Пароль еще раз"
				name="repeatPassword"
				type="password"
				required
			/>
			<Button onClick={handleClick}>Регистрация</Button>
		</form>
	);
}

export default RegisterForm;
