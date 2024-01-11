import { MouseEvent } from "react";

import AuthRedirect from "components/AuthRedirect";
import LoginForm from "components/LoginForm";
import { useModal } from "hooks/zustand/useModal";

import c from "./Login.module.scss";

function Login() {
	const { closeModal } = useModal();

	const stopPropagation = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
	};

	return (
		<div className={c.login} onClick={closeModal}>
			<div className={c.container}>
				<div className={c.wrap} onClick={stopPropagation}>
					<h2 className={c.title}>Войти в аккаунт</h2>
					<LoginForm />
					<AuthRedirect
						title="Нет учетной записи??"
						value="Зарегистрироваться"
					/>
				</div>
			</div>
		</div>
	);
}

export default Login;
