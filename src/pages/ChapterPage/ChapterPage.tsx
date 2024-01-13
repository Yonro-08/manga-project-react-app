import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ChapterHeader, ChapterImage, ChapterSetting } from "features/Chapter";
import useFetchManga from "hooks/query/useFetchManga";
import useResize from "hooks/useResize";
import { useManga } from "hooks/zustand/useManga";

import c from "./ChapterPage.module.scss";

const ChapterPage = () => {
	const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
	const [isHiding, setIsHiding] = useState(false);
	const width = useResize();

	const { endpoint } = useParams();
	const { getManga } = useManga();
	const { data, isLoading } = useFetchManga(endpoint);

	useEffect(() => {
		getManga(data);
	}, [isLoading]);

	useEffect(() => {
		if (width > 1080) {
			const handleScroll = () => {
				const currentScrollPos = window.pageYOffset;
				setIsHiding(prevScrollPos < currentScrollPos && currentScrollPos > 56);
				setPrevScrollPos(currentScrollPos);
			};

			window.addEventListener("scroll", handleScroll);
			return () => window.removeEventListener("scroll", handleScroll);
		}
	}, [prevScrollPos, isHiding]);

	return (
		<>
			<ChapterHeader isHiding={isHiding} />
			<section className={c.chapter}>
				<div className="container" data-chapter>
					<div className={c.container}>
						{data && endpoint && (
							<ChapterImage
								setIsHiding={setIsHiding}
								manga={data}
								endpoint={endpoint}
							/>
						)}
					</div>
				</div>
			</section>
			<ChapterSetting isHiding={isHiding} />
		</>
	);
};

export default ChapterPage;
