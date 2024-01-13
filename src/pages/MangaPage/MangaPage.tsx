import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { LeftContent, RightContent } from "features/Manga";
import MangaPageMobile from "features/Manga/components/MangaPageMobile";
import useFetchManga from "hooks/query/useFetchManga";
import useResize from "hooks/useResize";
import { useManga } from "hooks/zustand/useManga";

import c from "./MangaPage.module.scss";

const MangaPage = () => {
	const { endpoint } = useParams();
	const { getManga } = useManga();
	const width = useResize();

	const { data, isLoading } = useFetchManga(endpoint || "");

	useEffect(() => {
		getManga(data);
	}, [isLoading, data]);

	if (width < 700) {
		return <MangaPageMobile />;
	}

	return (
		<section className={c.manga}>
			<div className="container">
				{!isLoading && data && endpoint && (
					<div className={c.container}>
						<LeftContent
							src={data?.url}
							category={data?.activeCategory}
							endpoint={endpoint}
						/>
						<RightContent />
					</div>
				)}
			</div>
		</section>
	);
};

export default MangaPage;
