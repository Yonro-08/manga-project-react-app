import { Route, Routes } from "react-router-dom";

import Layout from "../components/Layout";
import {
	AboutPage,
	BookmarksPage,
	CatalogPage,
	ChapterPage,
	CreateManga,
	DmcaPage,
	HomePage,
	MangaPage,
	RulesPage,
} from "../pages";

export const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<HomePage />} />
				<Route path="/manga/:endpoint" element={<MangaPage />} />
				<Route path="/manga/create" element={<CreateManga />} />
				{/* <Route path="/profile" element={<ProfilePage />} /> */}
				<Route path="/bookmark" element={<BookmarksPage />} />
				<Route path="/catalog" element={<CatalogPage />} />
				<Route path="/rules" element={<RulesPage />} />
				<Route path="/dmca" element={<DmcaPage />} />
				<Route path="/about-us" element={<AboutPage />} />
			</Route>
			<Route path="/manga/:endpoint/chapters" element={<ChapterPage />} />
		</Routes>
	);
};
