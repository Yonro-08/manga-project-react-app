import { FC } from "react";

import { IconsProps } from "./types";

const BookmarkIcon: FC<IconsProps> = (props) => {
	return (
		<svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" {...props}>
			<path d="M19 18l2 1V3c0-1.1-.9-2-2-2H8.99C7.89 1 7 1.9 7 3h10c1.1 0 2 .9 2 2v13zM15 5H5c-1.1 0-2 .9-2 2v16l7-3 7 3V7c0-1.1-.9-2-2-2z"></path>
		</svg>
	);
};

export default BookmarkIcon;
