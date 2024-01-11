import { FC } from "react";

import { IconsProps } from "./types";

const ArrowDown: FC<IconsProps> = (props) => {
  return (
    <svg
      focusable="false"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="white"
      {...props}
    >
      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
    </svg>
  );
};

export default ArrowDown;
