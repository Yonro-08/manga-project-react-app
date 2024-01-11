import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import MangaAbout from "../MangaAbout";
import MangaChapters from "../MangaChapters";
import MangaSimilar from "../MangaSimilar";

import { useManga } from "hooks/zustand/useManga";

import c from "./RightContentBody.module.scss";

const RightContentBody = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const pQuery = searchParams.get("p") || "";

	const { manga } = useManga();

	useEffect(() => {
		setSearchParams({ p: "about" });
	}, []);

	return (
		<div className={c.container}>
			<div className={c.aboutContainer}>
				<div className={c.route} data-active={pQuery}>
					<Link className={c.link} to="?p=about">
						ОПИСАНИЕ
					</Link>
					<Link className={c.link} to="?p=chapters">
						ГЛАВЫ ({manga?.chapters.length})
					</Link>
				</div>
				{pQuery === "about" ? (
					<MangaAbout content={manga?.content} />
				) : (
					<MangaChapters
						chapters={manga?.chapters}
						endpoint={manga?.endpoint}
					/>
				)}
			</div>
			<MangaSimilar />
		</div>
	);
};

export default RightContentBody;
