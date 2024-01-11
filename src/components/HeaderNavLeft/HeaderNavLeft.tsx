import { Link } from "react-router-dom";

import { SearchIcon } from "icons";

import c from "./HeaderNavLeft.module.scss";

const HeaderNavLeft = () => {
	return (
		<nav className={c.nav}>
			<ul className="headerList">
				<li>
					<Link to="/manga/create">Каталог</Link>
				</li>
				<li>
					<Link to="tops">Топы</Link>
				</li>
				<li>
					<div className={c.search}>
						<SearchIcon /> Поиск
					</div>
				</li>
			</ul>
		</nav>
	);
};

export default HeaderNavLeft;
