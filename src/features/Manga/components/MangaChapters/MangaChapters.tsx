import ChapterList from "components/ChapterList";
import { ChapterProps } from "types/Manga";

import c from "./MangaChapters.module.scss";

const MangaChapters = ({
	chapters,
	endpoint,
}: {
	chapters: ChapterProps[] | undefined;
	endpoint: string | undefined;
}) => {
	return (
		<div className={c.container}>
			{chapters &&
				endpoint &&
				chapters.map((chapter, index) => {
					return (
						<ChapterList key={index} chapter={chapter} endpoint={endpoint} />
					);
				})}
		</div>
	);
};

export default MangaChapters;
