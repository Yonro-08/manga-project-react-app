import { Link } from "react-router-dom";

import { LogoIcon } from "icons";

import c from "./Logo.module.scss";

const Logo = () => {
  return (
    <div className={c.container}>
      <Link to={"/"}>
        <LogoIcon />
      </Link>
    </div>
  );
};

export default Logo;
