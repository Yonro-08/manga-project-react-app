import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	Dispatch,
	MouseEvent,
	SetStateAction,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useSearchParams } from "react-router-dom";

import {
	handleTransitionPagesNext,
	handleTransitionPagesPrev,
} from "features/Chapter";
import { useAuth } from "hooks/zustand/useAuth";
import { HeartOutlineIcon } from "icons";
import { postLike } from "lib/api/manga";
import ChapterButton from "../ChapterButton/ChapterButton";

import { MangaProps } from "types/Manga";
import c from "./ChapterImage.module.scss";

interface ChapterImageProps {
	setIsHiding: Dispatch<SetStateAction<boolean>>;
	manga: MangaProps;
	endpoint: string;
}

function ChapterImage({ setIsHiding, manga, endpoint }: ChapterImageProps) {
	const [image, setImage] = useState("");
	const [isLike, setIsLike] = useState(false);
	const [count, setCount] = useState(0);

	const [searchParams, _setSearchParams] = useSearchParams();

	const { user } = useAuth();
	const queryClient = useQueryClient();

	const pageQuery = Number(searchParams.get("page")) || 0;
	const chapterQuery = Number(searchParams.get("chapter")) || 0;

	const chapter = manga?.chapters.find(
		(chapter) => chapter.chapterNum === chapterQuery
	);

	const mutationLike = useMutation<boolean, Error>({
		mutationFn: () => {
			if (!chapter) return new Promise((res) => res(false));
			return postLike(endpoint, chapter.chapterNum);
		},
	});

	useEffect(() => {
		setImage("");
		(async () => {
			if (!chapter) return;
			const response = await fetch(chapter?.chapterImage[pageQuery - 1]);
			setImage(response.url);
		})();
	}, [pageQuery, chapter]);

	useEffect(() => {
		setIsLike(false);
		if (!chapter) return;

		setCount(chapter.liked.length);
		const like = chapter.liked.find((like) => like === user?._id);

		if (like) {
			setIsLike(true);
		}
	}, [user, chapterQuery]);

	const handleTransitionPagesNextMemoized = useMemo(() => {
		if (!chapter) return;
		return handleTransitionPagesNext(
			pageQuery,
			chapterQuery,
			endpoint,
			manga,
			chapter
		);
	}, [pageQuery, chapterQuery, setImage, image]);

	const handleClick = (event: MouseEvent<HTMLDivElement>) => {
		const target = event.target as HTMLElement;
		if (target.className === c.button) return;
		setIsHiding((prev) => !prev);
	};

	const handleLiked = async (event: MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		setIsLike(true);
		setCount((prev) => prev + 1);
		mutationLike.mutateAsync().then(() => {
			queryClient.refetchQueries({ queryKey: ["manga", endpoint] });
		});
	};

	return (
		<div className={c.chapterImage} onClick={handleClick}>
			{chapter && (
				<>
					{!(
						chapterQuery === manga?.chapters[0].chapterNum && pageQuery === 1
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
					{chapter.chapterImage.length === pageQuery && (
						<div className={c.likeContainer}>
							<div className={c.like} onClick={handleLiked}>
								<HeartOutlineIcon fill={isLike ? "orange" : "transparent"} />
								<p>Спасибо</p>
							</div>
							<span>Сказали спасибо {count}</span>
						</div>
					)}
				</>
			)}
		</div>
	);
}

export default ChapterImage;
