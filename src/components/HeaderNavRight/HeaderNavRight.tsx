import { Link } from "react-router-dom";

import BurgerMenu from "components/BurgerMenu";
import DropDown from "components/DropDown";
import ProfileImage from "components/ProfileImage";
import SwitchTheme from "components/SwitchTheme";
import { useAuth } from "hooks/zustand/useAuth";
import { useModal } from "hooks/zustand/useModal";
import { SettingIcon } from "icons";

import { getLocalStorage } from "utils/localStorage";
import c from "./HeaderNavRight.module.scss";

const HeaderNavRight = () => {
	const { openModal } = useModal();
	const isAuth = getLocalStorage("isAuthInitialized") === "true";
	const { user } = useAuth();

	return (
		<div className={c.container}>
			<nav className={c.nav}>
				<ul className="headerList">
					<li>
						<Link to="/bookmark">Закладки</Link>
					</li>
				</ul>
			</nav>
			{!isAuth && <SwitchTheme />}
			<button className={c.button}>
				<SettingIcon />
			</button>
			{isAuth && user ? (
				<DropDown
					value={<ProfileImage avatar={user.avatar} />}
					burgerContent={<BurgerMenu user={user} />}
				/>
			) : (
				<button className={c.enterProfile} onClick={openModal}>
					Войти
				</button>
			)}
		</div>
	);
};

export default HeaderNavRight;
