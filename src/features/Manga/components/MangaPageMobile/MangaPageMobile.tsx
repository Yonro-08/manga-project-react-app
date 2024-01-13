import { useManga } from "hooks/zustand/useManga";

import Button from "components/Button";
import DropDown from "components/DropDown";
import { updateLineStyles } from "features/Manga/utils/updateLineStyles";
import { ArrowRight, HeartIcon, StarIcon } from "icons";
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import BookmarkMenu from "../BookmarkMenu";
import MangaAbout from "../MangaAbout";
import MangaChapters from "../MangaChapters";

import c from "./MangaPageMobile.module.scss";

interface MangaPageMobileProps {}

function MangaPageMobile({}: MangaPageMobileProps) {
	const [value, setValue] = useState("");
	const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

	const [searchParams, setSearchParams] = useSearchParams();
	const pQuery = searchParams.get("p") || "";
	const navigationRef = useRef<HTMLDivElement>(null);
	const aboutRef = useRef<HTMLAnchorElement>(null);
	const chapterRef = useRef<HTMLAnchorElement>(null);
	const lineRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLDivElement>(null);
	const { manga } = useManga();

	useEffect(() => {
		setSearchParams({ p: "about" });
	}, []);

	useEffect(() => {
		if (!manga) return;
		setValue(manga?.activeCategory);
	}, [manga]);

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

	useEffect(() => {
		const handleScroll = () => {
			if (!buttonRef.current) return;
			const currentScrollPos = window.pageYOffset;
			if (currentScrollPos === 0) {
				buttonRef.current.style.display = "none";
			}
			if (currentScrollPos > 0) {
				buttonRef.current.style.display = "flex";
			}
			setPrevScrollPos(currentScrollPos);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [prevScrollPos, buttonRef.current]);

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
				{manga && pQuery === "about" ? (
					<MangaAbout content={manga?.content} genres={manga.genres} />
				) : (
					<MangaChapters
						chapters={manga?.chapters}
						endpoint={manga?.endpoint}
					/>
				)}
			</div>
			<div className={c.buttons} ref={buttonRef}>
				<Link
					to={`/manga/${manga.endpoint}/chapters?chapter=1&page=1`}
					className={c.link}
				>
					Читать
				</Link>
				<DropDown
					classContainer={c.button}
					classBurger={c.burger}
					value={
						<Button>
							<svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
								<path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"></path>
							</svg>
							<ArrowRight className={c.arrow} />
						</Button>
					}
					burgerContent={
						<BookmarkMenu activeCategory={value} setValue={setValue} />
					}
					isBurgerOnTop
				/>
			</div>
		</div>
	);
}

export default MangaPageMobile;
