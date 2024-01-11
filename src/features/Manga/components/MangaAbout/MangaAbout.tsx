import { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { ArrowDown } from "icons";

import c from "./MangaAbout.module.scss";

interface MangaAboutProps {
	content?: string;
	genres?: string[];
}

const MangaAbout = (props: MangaAboutProps) => {
	const Genres = [
		"Экшен",
		"Элементы юмора",
		"Приключения",
		"Романтика",
		"Сверхъестественное",
		"Фэнтези",
	];
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
	}, [textRef.current, props.content]);

	return (
		<div className={c.container}>
			<div className={c.textContainer}>
				<div ref={textRef} className={c.text} data-text-column={showFullText}>
					{props?.content?.split("\n").map((line, index) => (
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
			<div className={c.genresContainer}>
				{Genres.map((genre, index) => {
					return (
						<Link key={index} to={`/catalog?${genre}`} className={c.genre}>
							{genre}
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default MangaAbout;
