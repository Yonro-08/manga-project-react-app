import axios from "lib/axios";
import { MangaListProps, MangaProps } from "types/Manga";

export const getMangaList = async (
	category: string,
	limit?: number
): Promise<MangaListProps[]> => {
	const params = new URLSearchParams({
		category: category.toString(),
	}).toString();

	const path = `/manga?${params}${limit ? `&limit=${limit}` : ""}`;
	const result = await axios.get(path);
	return result.data;
};

export const getMangaByEndpoint = async (
	endpoint: string
): Promise<MangaProps> => {
	const path = `/manga/${endpoint}`;
	const result = await axios.get(path);
	return result.data;
};

export const postLike = async (
	endpoint: string,
	chapterNum: number
): Promise<boolean> => {
	const path = `/manga/liked`;
	const result = await axios.post(path, { endpoint, chapterNum });
	return result.data;
};
