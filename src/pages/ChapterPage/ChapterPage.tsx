import { useEffect, useState } from "react";

import { ChapterHeader, ChapterImage, ChapterSetting } from "features/Chapter";

import c from "./ChapterPage.module.scss";

const ChapterPage = () => {
	const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
	const [isHiding, setIsHiding] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollPos = window.pageYOffset;
			setIsHiding(prevScrollPos < currentScrollPos && currentScrollPos > 56);
			setPrevScrollPos(currentScrollPos);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [prevScrollPos, isHiding]);

	return (
		<>
			<ChapterHeader isHiding={isHiding} />
			<section className={c.chapter}>
				<div className="container" data-chapter>
					<div className={c.container}>
						<ChapterImage setIsHiding={setIsHiding} />
					</div>
				</div>
			</section>
			<ChapterSetting isHiding={isHiding} />
		</>
	);
};

export default ChapterPage;
