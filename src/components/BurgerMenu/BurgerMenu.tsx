import { Link } from "react-router-dom";

import ProfileImage from "components/ProfileImage";
import SwitchTheme from "components/SwitchTheme";
import { useAuth } from "hooks/zustand/useAuth";
import ExitIcon from "icons/ExitIcon";
import { UserData } from "types/Auth";
import { removeLocalStorage } from "utils/localStorage";

import c from "./BurgerMenu.module.scss";

interface BurgerMenu {
	user: UserData;
}

function BurgerMenu({ user }: BurgerMenu) {
	const { setAuthInitialization } = useAuth();

	const handleLogout = () => {
		removeLocalStorage("token");
		removeLocalStorage("isAuthInitialized");
		setAuthInitialization(false);
	};

	return (
		<ul className={c.burgerMenu}>
			<Link to={"/profile"} className={c.header}>
				<div className={c.profileImage}>
					<ProfileImage avatar={user.avatar} />
				</div>
				<span className={c.title}>{user.username}</span>
			</Link>
			<li>
				<span>Изменить тему</span>
				<SwitchTheme />
			</li>
			<li onClick={handleLogout}>
				<span>Выйти</span>
				<ExitIcon />
			</li>
		</ul>
	);
}

export default BurgerMenu;
