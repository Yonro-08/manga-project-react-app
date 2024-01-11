import { Link } from "react-router-dom";

import { StarIcon } from "icons";
import { MangaListProps } from "types/Manga";

import c from "./MangaItem.module.scss";

const MangaItem = ({
	manga,
	width,
}: {
	manga: MangaListProps;
	width?: boolean;
}) => {
	const { endpoint, title, typeManga, url } = manga;

	return (
		<Link to={`/manga/${endpoint}?p=about`}>
			<div className={c.container} data-width={width}>
				<img className={c.image} src={url} alt="" />
				<div className={c.bodyContainer}>
					<p className={c.type}>{typeManga}</p>
					<div className={c.rating}>
						<p>9.8</p>
						<StarIcon />
					</div>
				</div>
				<p className={c.title}>{title.russianName}</p>
			</div>
		</Link>
	);
};

export default MangaItem;
