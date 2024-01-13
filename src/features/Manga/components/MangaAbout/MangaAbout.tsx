import { Fragment, useEffect, useRef, useState } from "react";

import { ArrowDown } from "icons";

import GenresList from "../GenresList";
import c from "./MangaAbout.module.scss";

interface MangaAboutProps {
	content: string;
	genres: string[];
}

const MangaAbout = ({ content, genres }: MangaAboutProps) => {
	const textRef = useRef<HTMLDivElement>(null);
	const [showFullText, setShowFullText] = useState<boolean>(false);

	useEffect(() => {
		if (textRef.current) {
			const lineHeight = parseInt(
				window.getComputedStyle(textRef.current).lineHeight,
				10
			);
			const textHeight = textRef.current.clientHeight;
			setShowFullText(textHeight > lineHeight * 4);
		}
	}, [textRef.current, content]);

	return (
		<div className={c.container}>
			<div className={c.textContainer}>
				<div ref={textRef} className={c.text} data-text-column={showFullText}>
					{content?.split("\n").map((line, index) => (
						<Fragment key={index}>
							{line}
							<br />
						</Fragment>
					))}
				</div>
				{showFullText && (
					<button
						className={c.textMore}
						onClick={() => {
							setShowFullText(false);
						}}
					>
						<ArrowDown />
						Больше
					</button>
				)}
			</div>
			<GenresList genres={genres} />
		</div>
	);
};

export default MangaAbout;
