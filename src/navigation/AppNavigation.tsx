import { Route, Routes } from "react-router-dom";

import Layout from "../components/Layout";
import {
	BookmarksPage,
	ChapterPage,
	CreateManga,
	HomePage,
	MangaPage,
	ProfilePage,
} from "../pages";

export const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<HomePage />} />
				<Route path="/manga/:endpoint" element={<MangaPage />} />
				<Route path="/manga/create" element={<CreateManga />} />
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="/bookmark" element={<BookmarksPage />} />
			</Route>
			<Route path="/manga/:endpoint/chapters" element={<ChapterPage />} />
		</Routes>
	);
};
