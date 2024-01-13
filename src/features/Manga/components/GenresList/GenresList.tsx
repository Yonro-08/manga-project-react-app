import { useState } from "react";

import c from "./GenresList.module.scss";

interface GenresListProps {
	genres: string[];
}

function GenresList({ genres }: GenresListProps) {
	const [showAllGenres, setShowAllGenres] = useState(false);

	const displayedGenres = showAllGenres ? genres : genres.slice(0, 10);
	const remainingGenres = genres.length - displayedGenres.length;

	return (
		<div className={c.genresContainer}>
			{displayedGenres.map((genre, index) => {
				return (
					<span key={index} className={c.genre}>
						{genre}
					</span>
				);
			})}
			{genres.length > 10 && (
				<button
					onClick={() => setShowAllGenres(!showAllGenres)}
					className={c.button}
				>
					{showAllGenres ? "Скрыть" : `еще ${remainingGenres}`}
				</button>
			)}
		</div>
	);
}

export default GenresList;
