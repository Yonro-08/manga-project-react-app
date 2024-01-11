import { create } from "zustand";

import { MangaProps } from "types/Manga";

interface useMangaProps {
	manga: MangaProps | null;
	getManga: (data: MangaProps | undefined) => void;
}

export const useManga = create<useMangaProps>((set) => ({
	manga: null,
	getManga: (data) =>
		set(() => {
			return { manga: data };
		}),
}));
