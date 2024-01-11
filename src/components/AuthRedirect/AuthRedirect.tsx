import { useModal } from "hooks/zustand/useModal";

import c from "./AuthRedirect.module.scss";

interface AuthRedirectProps {
	title: string;
	value: string;
}

function AuthRedirect({ title, value }: AuthRedirectProps) {
	const { authRedirect } = useModal();

	return (
		<div className={c.container}>
			<span>{title}</span>
			<span onClick={authRedirect}>{value}</span>
		</div>
	);
}

export default AuthRedirect;
