import axios from "lib/axios";
import { MangaListProps, MangaProps } from "types/Manga";

export const getMangaList = async (): Promise<MangaListProps[]> => {
	const path = `/manga`;
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
