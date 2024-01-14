import { Link } from "react-router-dom";

import ProfileImage from "components/ProfileImage";
import SwitchTheme from "components/SwitchTheme";
import { useAuth } from "hooks/zustand/useAuth";
import { BookmarkIcon } from "icons";
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
				<Link to="/catalog" className={c.catalog}>
					<span>Каталог</span>
					<svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
						<path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"></path>
					</svg>
				</Link>
			</li>
			<li>
				<Link to="/bookmark" className={c.bookmark}>
					<span>Закладки</span>
					<BookmarkIcon />
				</Link>
			</li>
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
