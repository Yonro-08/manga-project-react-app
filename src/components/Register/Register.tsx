import { MouseEvent } from "react";

import AuthRedirect from "components/AuthRedirect";
import RegisterForm from "components/RegisterForm";
import { useModal } from "hooks/zustand/useModal";

import c from "./Register.module.scss";

interface Register {}

function Register() {
	const { closeModal } = useModal();

	const stopPropagation = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
	};

	return (
		<div className={c.register} onClick={closeModal}>
			<div className={c.container}>
				<div className={c.wrap} onClick={stopPropagation}>
					<h2 className={c.title}>Зарегистрировать аккаунт</h2>
					<RegisterForm />
					<AuthRedirect title="Уже есть аккаунт?" value="Войти" />
				</div>
			</div>
		</div>
	);
}

export default Register;
