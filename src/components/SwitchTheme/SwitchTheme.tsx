import { ChangeEvent } from "react";

import { useThemeZustand } from "hooks/zustand/useThemeZustand";
import { MoonIcon, SunIcon } from "icons";

import c from "./SwitchTheme.module.scss";

const SwitchTheme = () => {
  const { switchTheme, theme } = useThemeZustand();

  const handleSwitchTheme = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      switchTheme("light");
      return;
    }
    switchTheme("dark");
  };

  return (
    <div className={c.container}>
      <input
        type="checkbox"
        checked={theme === "light"}
        onChange={handleSwitchTheme}
      />
      <span>
        <MoonIcon />
        <SunIcon />
      </span>
    </div>
  );
};

export default SwitchTheme;
