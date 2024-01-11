export interface MangaListProps {
	title: {
		otherName: string;
		russianName: string;
	};
	endpoint: string;
	_id: string;
	url: string;
	typeManga: string;
	year: string;
}

export interface ChapterProps {
	_id: string;
	chapterTom: number;
	chapterNum: number;
	chapterImage: string[];
	views: string;
	createChapter: string;
}

export interface MangaProps {
	title: {
		englishName: string;
		russianName: string;
		otherName?: string;
	};
	_id: string;
	endpoint: string;
	status: string;
	url: string;
	chapters: ChapterProps[];
	content: string;
	typeManga: string;
	year: string;
	createdAt: string;
	updatedAt: string;
	activeCategory: string;
}
