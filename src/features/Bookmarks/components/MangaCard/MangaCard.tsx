import { Link } from "react-router-dom";

import { BookmarkData } from "types/Auth";

import c from "./MangaCard.module.scss";

interface MangaCardProps {
	data: BookmarkData;
}

function MangaCard({ data }: MangaCardProps) {
	return (
		<Link
			key={data.endpoint}
			to={`/manga/${data.endpoint}`}
			className={c.container}
		>
			<img src={data.url} alt="" />
			<h4 className={c.cardTitle}>{data.title}</h4>
		</Link>
	);
}

export default MangaCard;
