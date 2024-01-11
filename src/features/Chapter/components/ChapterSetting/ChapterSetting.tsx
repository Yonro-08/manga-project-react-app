import { useSearchParams } from "react-router-dom";

import { useManga } from "hooks/zustand/useManga";
import ChaptersPanel from "../ChaptersPanel";
import DropDown from "../DropDown";

import c from "./ChapterSetting.module.scss";

interface ChapterSetting {
	isHiding: boolean;
}

function ChapterSetting({ isHiding }: ChapterSetting) {
	const [searchParams, _setSearchParams] = useSearchParams();
	const chapterQuery = Number(searchParams.get("chapter")) || 0;

	const { manga } = useManga();
	if (!manga) return null;

	const chapter = manga?.chapters.find(
		(chapter) => chapter.chapterNum === chapterQuery
	);

	return (
		<ul className={c.chapterSetting}>
			<li>
				<DropDown isHiding={isHiding} pagesOptions={chapter?.chapterImage} />
			</li>
			<ul className={c.menuButtons}>
				<li>
					<ChaptersPanel />
				</li>
			</ul>
		</ul>
	);
}

export default ChapterSetting;
