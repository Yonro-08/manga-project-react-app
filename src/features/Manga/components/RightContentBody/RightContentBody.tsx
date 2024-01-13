import { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { updateLineStyles } from "features/Manga/utils/updateLineStyles";
import { useManga } from "hooks/zustand/useManga";
import MangaAbout from "../MangaAbout";
import MangaChapters from "../MangaChapters";

import MangaSimilar from "../MangaSimilar";
import c from "./RightContentBody.module.scss";

const RightContentBody = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const pQuery = searchParams.get("p") || "";
	const navigationRef = useRef<HTMLDivElement>(null);
	const aboutRef = useRef<HTMLAnchorElement>(null);
	const chapterRef = useRef<HTMLAnchorElement>(null);
	const lineRef = useRef<HTMLDivElement>(null);

	const { manga } = useManga();

	useEffect(() => {
		setSearchParams({ p: "about" });
	}, []);

	useEffect(() => {
		if (
			!lineRef.current ||
			!aboutRef.current ||
			!navigationRef.current ||
			!chapterRef.current
		)
			return;

		updateLineStyles(
			pQuery === "about",
			lineRef.current,
			aboutRef.current,
			navigationRef.current
		);

		updateLineStyles(
			pQuery === "chapters",
			lineRef.current,
			chapterRef.current,
			navigationRef.current
		);
	}, [pQuery, chapterRef.current, aboutRef.current]);

	return (
		<div className={c.container}>
			<div className={c.aboutContainer}>
				<div className={c.route} ref={navigationRef}>
					<Link
						className={c.link}
						to="?p=about"
						ref={aboutRef}
						data-active={pQuery === "about"}
					>
						ОПИСАНИЕ
					</Link>
					<Link
						className={c.link}
						to="?p=chapters"
						ref={chapterRef}
						data-active={pQuery === "chapters"}
					>
						ГЛАВЫ ({manga?.chapters.length})
					</Link>
					<div className={c.line} ref={lineRef}></div>
				</div>
				{manga && pQuery === "about" ? (
					<MangaAbout content={manga?.content} genres={manga?.genres} />
				) : (
					<MangaChapters
						chapters={manga?.chapters}
						endpoint={manga?.endpoint}
					/>
				)}
			</div>
			<MangaSimilar />
		</div>
	);
};

export default RightContentBody;
