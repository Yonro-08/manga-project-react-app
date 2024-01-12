import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { ChapterProps } from "types/Manga";

import c from "./DropDown.module.scss";

const DropDown = ({
	options,
	pagesOptions,
	isHiding,
}: {
	options?: ChapterProps[];
	pagesOptions?: string[];
	isHiding: boolean;
}) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const chapterQuery = Number(searchParams.get("chapter"));
	const pageQuery = Number(searchParams.get("page"));
	const [isActive, setIsActive] = useState<boolean>(false);
	const ref = useRef<HTMLDivElement>(null);
	const refBurger = useRef<HTMLDivElement>(null);

	const handleClick = () => {
		setIsActive((prev) => !prev);
	};

	useEffect(() => {
		if (isHiding) {
			setIsActive(false);
		}
	}, [isHiding]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				ref.current &&
				!ref.current.contains(event.target as Node) &&
				refBurger.current &&
				!refBurger.current.contains(event.target as Node)
			) {
				setIsActive(false);
			}
		};

		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	if (pagesOptions) {
		return (
			<div className={c.dropdown} onClick={handleClick} ref={ref}>
				<div className={c.listPage}>
					{pageQuery}/{pagesOptions.length}
				</div>
				<div
					className={c.burger}
					data-active={isActive}
					ref={refBurger}
					data-pages
				>
					<div className={c.innerBurger}>
						{pagesOptions.map((_option, index) => (
							<p
								key={index}
								data-active={index + 1 === pageQuery}
								onClick={() => {
									setSearchParams({
										chapter: chapterQuery.toString(),
										page: (index + 1).toString(),
									});
								}}
							>
								{index + 1}
							</p>
						))}
					</div>
				</div>
			</div>
		);
	}

	if (options) {
		return (
			<div className={c.dropdown} onClick={handleClick} ref={ref}>
				<div className={c.list}>
					{
						options.find((options) => chapterQuery === options.chapterNum)
							?.chapterTom
					}{" "}
					- {chapterQuery}
				</div>
				<div className={c.burger} data-active={isActive} ref={refBurger}>
					<div className={c.innerBurger}>
						{options.map((option, index) => (
							<p
								key={index}
								data-active={option.chapterNum === chapterQuery}
								onClick={() => {
									setSearchParams({
										chapter: String(option?.chapterNum),
										page: "1",
									});
								}}
							>
								{option?.chapterNum}
							</p>
						))}
					</div>
				</div>
			</div>
		);
	}

	return <></>;
};

export default DropDown;
