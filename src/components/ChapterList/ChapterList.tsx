import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	Dispatch,
	MouseEvent,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "hooks/zustand/useAuth";
import { HeartOutlineIcon } from "icons";
import { postLike } from "lib/api/manga";
import { ChapterProps } from "types/Manga";

import c from "./ChapterList.module.scss";

interface ChapterPropsHere {
	chapter: ChapterProps;
	endpoint: string;
	isShort?: boolean;
	chapterNow?: boolean;
	setIsActive?: Dispatch<SetStateAction<boolean>>;
}

const ChapterList = ({
	chapter,
	endpoint,
	isShort,
	chapterNow,
	setIsActive,
}: ChapterPropsHere) => {
	const navigate = useNavigate();
	const { user } = useAuth();
	const [isLike, setIsLike] = useState(false);
	const [count, setCount] = useState(chapter.liked.length);

	const queryClient = useQueryClient();

	const mutationLike = useMutation<boolean, Error>({
		mutationFn: () => {
			return postLike(endpoint, chapter.chapterNum);
		},
	});

	const date = chapter?.createChapter
		.split("T")[0]
		.split("-")
		.reverse()
		.join("/");

	const handleClick = () => {
		if (setIsActive) {
			setIsActive(false);
		}

		navigate(
			`/manga/${endpoint}/chapters?chapter=${chapter?.chapterNum}&page=1`
		);
	};

	useEffect(() => {
		const like = chapter.liked.find((like) => like === user?._id);
		if (like) {
			setIsLike(true);
		}
	}, [user]);

	const handleLiked = async (event: MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		setIsLike(true);
		setCount((prev) => prev + 1);
		mutationLike.mutateAsync().then(() => {
			queryClient.refetchQueries({ queryKey: ["manga", endpoint] });
		});
	};

	return (
		<div className={c.container} onClick={handleClick} data-active={chapterNow}>
			<div className={c.ChapterTom}>1</div>
			<div className={c.ChapterNumber}>Глава {chapter?.chapterNum}</div>
			{!isShort && (
				<>
					{/* <div className={c.ChapterAuthor}>Ханами</div> */}
					<div className={c.ChapterDate}>{date}</div>
					<div className={c.ChapterLikes} onClick={handleLiked}>
						<HeartOutlineIcon fill={isLike ? "orange" : "transparent"} />
						<p>{count}</p>
					</div>
				</>
			)}
		</div>
	);
};

export default ChapterList;
