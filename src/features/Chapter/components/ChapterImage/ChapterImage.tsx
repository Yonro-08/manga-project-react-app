import {
	Dispatch,
	MouseEvent,
	SetStateAction,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useParams, useSearchParams } from "react-router-dom";

import {
	handleTransitionPagesNext,
	handleTransitionPagesPrev,
} from "features/Chapter";
import useFetchManga from "hooks/query/useFetchManga";
import { useManga } from "hooks/zustand/useManga";
import ChapterButton from "../ChapterButton/ChapterButton";

import c from "./ChapterImage.module.scss";

interface ChapterImageProps {
	setIsHiding: Dispatch<SetStateAction<boolean>>;
}

function ChapterImage({ setIsHiding }: ChapterImageProps) {
	const { endpoint } = useParams();
	const [searchParams, _setSearchParams] = useSearchParams();
	const pageQuery = Number(searchParams.get("page")) || 0;
	const chapterQuery = Number(searchParams.get("chapter")) || 0;
	const [image, setImage] = useState("");

	const { getManga } = useManga();
	const { data, isLoading } = useFetchManga(endpoint);

	useEffect(() => {
		getManga(data);
	}, [isLoading]);

	const chapter = data?.chapters.find(
		(chapter) => chapter.chapterNum === chapterQuery
	);

	useEffect(() => {
		setImage("");
		(async () => {
			if (!chapter) return;
			const response = await fetch(chapter?.chapterImage[pageQuery - 1]);
			setImage(response.url);
		})();
	}, [pageQuery, chapter]);

	const handleTransitionPagesNextMemoized = useMemo(() => {
		if (!data || !chapter) return;

		return handleTransitionPagesNext(
			pageQuery,
			chapterQuery,
			endpoint,
			data,
			chapter
		);
	}, [pageQuery, chapterQuery, setImage, image]);

	const handleClick = (event: MouseEvent<HTMLDivElement>) => {
		const target = event.target as HTMLElement;
		if (target.className === c.button) return;
		setIsHiding((prev) => !prev);
	};

	return (
		<div className={c.chapterImage} onClick={handleClick}>
			{!isLoading && chapter && data && (
				<>
					{!(
						chapterQuery === data?.chapters[0].chapterNum && pageQuery === 1
					) && (
						<ChapterButton
							className={c.button}
							to={handleTransitionPagesPrev(pageQuery, chapterQuery, endpoint)}
							dataPosition="left"
						/>
					)}
					<img className={c.image} src={image} alt="" />
					<ChapterButton
						className={c.button}
						to={handleTransitionPagesNextMemoized || ""}
						dataPosition="right"
					/>
				</>
			)}
		</div>
	);
}

export default ChapterImage;
