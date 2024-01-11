import { FC } from "react";

import { IconsProps } from "./types";

const ArrowRight: FC<IconsProps> = (props) => {
  return (
    <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
    </svg>
  );
};

export default ArrowRight;
