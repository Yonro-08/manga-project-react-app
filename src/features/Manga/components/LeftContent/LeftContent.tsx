import { useState } from "react";
import { Link } from "react-router-dom";

import Button from "components/Button";
import DropDown from "components/DropDown/DropDown";
import ArrowRight from "icons/ArrowRight";
import BookmarkMenu from "../BookmarkMenu";

import c from "./LeftContent.module.scss";

interface LeftContentProps {
	src: string;
	category: string;
	endpoint: string;
}

const LeftContent = ({ src, category, endpoint }: LeftContentProps) => {
	const [value, setValue] = useState(category);

	return (
		<div className={c.leftContent}>
			<div className={c.container}>
				<div className={c.image}>
					<img src={src} alt="" />
				</div>
				<div className={c.buttons}>
					<Link
						to={`/manga/${endpoint}/chapters?chapter=1&page=1`}
						className={c.link}
					>
						Читать
					</Link>
					<DropDown
						classContainer={c.button}
						classBurger={c.burger}
						value={
							<Button>
								{value}
								<ArrowRight />
							</Button>
						}
						burgerContent={
							<BookmarkMenu activeCategory={value} setValue={setValue} />
						}
						isBurgerOnTop
					/>
				</div>
			</div>
		</div>
	);
};

export default LeftContent;
