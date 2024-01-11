import { ChapterProps, MangaProps } from "types/Manga";

export const handleTransitionPagesNext = (
	page: number,
	chapterNum: number,
	endpoint: string = "",
	manga: MangaProps,
	chapter: ChapterProps
): string => {
	if (
		page === chapter?.chapterImage.length &&
		chapterNum === manga?.chapters[manga?.chapters.length - 1].chapterNum
	) {
		window.scrollTo(0, 0);
		return `/manga/${endpoint}`;
	}

	if (page === chapter?.chapterImage.length) {
		return `/manga/${endpoint}/chapters?chapter=${chapterNum + 1}&page=1`;
	}

	window.scrollTo(0, 0);
	return `/manga/${endpoint}/chapters?chapter=${chapterNum}&page=${page + 1}`;
};

export const handleTransitionPagesPrev = (
	page: number,
	chapterNum: number,
	endpoint: string = ""
): string => {
	if (page === 1) {
		return `/manga/${endpoint}/chapters?chapter=${chapterNum - 1}&page=1`;
	}
	return `/manga/${endpoint}/chapters?chapter=${chapterNum}&page=${page - 1}`;
};
