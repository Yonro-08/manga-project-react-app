import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

import { HeartOutlineIcon } from "icons";
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

	return (
		<div className={c.container} onClick={handleClick} data-active={chapterNow}>
			<div className={c.ChapterTom}>1</div>
			<div className={c.ChapterNumber}>Глава {chapter?.chapterNum}</div>
			{!isShort && (
				<>
					{/* <div className={c.ChapterAuthor}>Ханами</div> */}
					<div className={c.ChapterDate}>{date}</div>
					<div
						className={c.ChapterLikes}
						onClick={(event) => event.stopPropagation()}
					>
						<HeartOutlineIcon />
						<p>0</p>
					</div>
				</>
			)}
		</div>
	);
};

export default ChapterList;
