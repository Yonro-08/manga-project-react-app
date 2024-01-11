import Logo from "components/Logo";
import HeaderNavLeft from "components/HeaderNavLeft";
import HeaderNavRight from "components/HeaderNavRight";

import c from "./Header.module.scss";

const Header = () => {
  return (
    <header className={c.header}>
      <div className="container">
        <div className={c.container}>
          <div className={c.leftContent}>
            <Logo />
            <HeaderNavLeft />
          </div>
          <HeaderNavRight />
        </div>
      </div>
    </header>
  );
};

export default Header;
