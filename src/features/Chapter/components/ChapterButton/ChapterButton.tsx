import { Link } from "react-router-dom";

import React from "react";
import c from "./ChapterButton.module.scss";

interface ChapterButtonProps extends React.HTMLAttributes<HTMLDivElement> {
	to: string;
	dataPosition: "left" | "right";
	className: string;
}

const ChapterButton = ({ to, dataPosition, className }: ChapterButtonProps) => {
	return (
		<div className={c.container} data-position={dataPosition}>
			<Link className={className} to={to} />
		</div>
	);
};

export default ChapterButton;
