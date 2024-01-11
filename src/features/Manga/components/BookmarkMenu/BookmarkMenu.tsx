import { Dispatch, SetStateAction } from "react";

import { useManga } from "hooks/zustand/useManga";
import { addBookmark } from "lib/api/bookmark";

import c from "./BookmarkMenu.module.scss";

interface BookmarkMenu {
	activeCategory: string;
	setValue: Dispatch<SetStateAction<string>>;
}

const bookmarkOptions = [
	"Читаю",
	"Буду Читать",
	"Прочитано",
	"Брошено",
	"Отложено",
	"Не интересно",
];

function BookmarkMenu({ activeCategory, setValue }: BookmarkMenu) {
	const { manga } = useManga();
	const handleClick = async (category: string) => {
		setValue(category);
		if (!manga) return;
		await addBookmark({
			endpoint: manga?.endpoint,
			url: manga?.url,
			title: manga.title.russianName,
			category,
		});
	};

	return (
		<ul className={c.bookmarkMenu}>
			{bookmarkOptions.map((option, index) => {
				return (
					<li
						key={index}
						onClick={() => handleClick(option)}
						data-active={activeCategory === option}
					>
						{option}
					</li>
				);
			})}
		</ul>
	);
}

export default BookmarkMenu;
