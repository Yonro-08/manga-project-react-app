import classNames from "classnames";
import { Link } from "react-router-dom";

import HeaderNavRight from "components/HeaderNavRight";
import Logo from "components/Logo";
import { useManga } from "hooks/zustand/useManga";
import { ArrowLeft, ArrowRight } from "icons";
import DropDown from "../DropDown";

import c from "./ChapterHeader.module.scss";

interface ChapterHeaderProps {
	isHiding: boolean;
}

const ChapterHeader = ({ isHiding }: ChapterHeaderProps) => {
	const { manga } = useManga();

	return (
		<header
			className={classNames({ [c.header]: true }, { [c.hiding]: isHiding })}
		>
			<div className="container">
				<div className={c.container}>
					<div className={c.leftContent}>
						<Logo />
						<nav>
							<ul className="headerList">
								<li>
									<Link
										className="chapterTitle"
										to={`/manga/${manga?.endpoint}`}
									>
										{manga?.title?.russianName}
									</Link>
								</li>
							</ul>
						</nav>
					</div>
					<ul className={`${c.headerList} headerList`}>
						<li>
							<a>
								<ArrowLeft />
							</a>
						</li>
						{manga && <DropDown options={manga.chapters} isHiding={isHiding} />}
						<li>
							<a>
								<ArrowRight />
							</a>
						</li>
					</ul>
					<HeaderNavRight />
				</div>
			</div>
		</header>
	);
};

export default ChapterHeader;
