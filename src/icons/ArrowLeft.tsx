import { FC } from "react";

import { IconsProps } from "./types";

const ArrowLeft: FC<IconsProps> = (props) => {
  return (
    <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
    </svg>
  );
};

export default ArrowLeft;
