import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import ChapterList from "components/ChapterList";
import { useManga } from "hooks/zustand/useManga";
import ChapterListIcon from "icons/ChapterListIcon";
import CrossIcon from "icons/CrossIcon";
import { ChapterProps } from "types/Manga";

import c from "./ChaptersPanel.module.scss";

interface ChaptersPanelProps {}

function ChaptersPanel({}: ChaptersPanelProps) {
	const { manga } = useManga();
	const { endpoint } = useParams();
	const [chapter, setChapter] = useState<ChapterProps[]>();
	const [isActive, setIsActive] = useState(false);
	const [searchParams, _setSearchParams] = useSearchParams();
	const chapterQuery = Number(searchParams.get("chapter"));

	const handleClick = () => setIsActive((prev) => !prev);

	const handleChapterSort = () => {
		if (!chapter) return;
		let newChapter = [...chapter];
		newChapter = newChapter.reverse();
		setChapter(newChapter);
	};

	useEffect(() => {
		setChapter(manga?.chapters);
	}, []);

	return (
		<>
			<ChapterListIcon className={c.image} onClick={handleClick} />
			<div className={c.chaptersPanel} data-active={isActive}>
				<div className={c.header}>
					<button className={c.sort} onClick={handleChapterSort}>
						{chapter && chapter[0].chapterNum === 1
							? "Показать с конца"
							: "Показать с начала"}
					</button>
					<button className={c.cross} onClick={() => setIsActive(false)}>
						<CrossIcon />
					</button>
				</div>
				<div className={c.chapters}>
					{chapter &&
						endpoint &&
						chapter.map((elem) => {
							return (
								<ChapterList
									key={elem._id}
									endpoint={endpoint}
									chapter={elem}
									isShort
									setIsActive={setIsActive}
									chapterNow={elem.chapterNum === chapterQuery}
								/>
							);
						})}
				</div>
			</div>
		</>
	);
}

export default ChaptersPanel;
