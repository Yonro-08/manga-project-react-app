import { useManga } from "hooks/zustand/useManga";

import { updateLineStyles } from "features/Manga/utils/updateLineStyles";
import { HeartIcon, StarIcon } from "icons";
import { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import MangaAbout from "../MangaAbout";
import MangaChapters from "../MangaChapters";
import c from "./MangaPageMobile.module.scss";

interface MangaPageMobileProps {}

function MangaPageMobile({}: MangaPageMobileProps) {
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
	}, [
		pQuery,
		chapterRef.current,
		aboutRef.current,
		navigationRef.current,
		manga,
	]);

	if (!manga) return null;

	return (
		<div className={c.mangaPageMobile}>
			<div className={c.image}>
				<div
					className={c.backImage}
					style={{ backgroundImage: `url(${manga.url})` }}
				></div>
				<img src={manga.url} alt="" />
			</div>
			<div className={c.titleContainer}>
				<span className={c.subtitle}>
					{manga.title.englishName} / {manga.title.otherName}
				</span>
				<h2 className={c.title}>{manga.title.russianName}</h2>
				<span className={c.info}>
					{manga.typeManga} {manga.year}, Выпуск {manga.status}
				</span>
			</div>
			<div className={c.statsContainer}>
				<div className={c.stat}>
					<span className={c.statTitle}>Рейтинг</span>
					<div className={c.statContent}>
						<StarIcon width="20px" height="20px" fill="rgb(255, 152, 0)" />
						8.5
					</div>
				</div>
				<div className={c.stat}>
					<span className={c.statTitle}>Глав</span>
					<span className={c.statContent}>{manga.chapters.length}</span>
				</div>
				<div className={c.stat}>
					<span className={c.statTitle}>Лайков</span>
					<div className={c.statContent}>
						<HeartIcon width="16px" height="16px" fill="rgb(245, 245, 245)" />
						51.4 K
					</div>
				</div>
			</div>
			<div className={c.content}>
				<div className={c.route}>
					<div className={c.innerRoute} ref={navigationRef}>
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
				</div>
				{pQuery === "about" ? (
					<MangaAbout content={manga?.content} />
				) : (
					<MangaChapters
						chapters={manga?.chapters}
						endpoint={manga?.endpoint}
					/>
				)}
			</div>
		</div>
	);
}

export default MangaPageMobile;
