import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import { InView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

import { MangaCard } from "features/Bookmarks";
import { CATEGORYDATA } from "features/Bookmarks/constans/CATEGORYDATA";
import useFetchBookmarkTotalLength from "hooks/query/useFetchBookmarkTotalLength";
import useInfinityFetchBookmark from "hooks/query/useInfinityFetchBookmark";
import { useAuth } from "hooks/zustand/useAuth";
import { useModal } from "hooks/zustand/useModal";
import { checkAuth } from "utils/checkAuth";

import c from "./BookmarksPage.module.scss";

function BookmarksPage() {
	const navigate = useNavigate();
	const { openModal } = useModal();
	const { isAuth } = useAuth();
	const [activeCategory, setActiveCategory] = useState(CATEGORYDATA[0]);

	const { data: categoryData, isLoading: isCategoryDataLoading } =
		useFetchBookmarkTotalLength();

	const {
		data: infiniteBookmarkData,
		isLoading,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useInfinityFetchBookmark(activeCategory);

	useEffect(() => {
		checkAuth(navigate, openModal);
	}, [isAuth, isLoading]);

	const checkActiveCategory = (value: string) => {
		return activeCategory === value;
	};

	const bookmarksData = useMemo(() => {
		if (infiniteBookmarkData === undefined) return [];
		return infiniteBookmarkData.pages.flatMap((p) => p);
	}, [infiniteBookmarkData]);

	const onScrollToEnd = () => {
		if (isLoading) return;
		fetchNextPage();
	};

	if (!categoryData)
		return <div className={c.noBookmark}>Нет ни одной закладки</div>;

	return (
		<section className={c.bookmarksPage}>
			<div className="container">
				<h1 className={c.title}>Закладки</h1>
				<div className={c.sorts}>
					{CATEGORYDATA.map((elem, index) => {
						return (
							<button
								key={index}
								className={classNames(
									{ [c.sortELem]: true },
									{ [c.active]: checkActiveCategory(elem) }
								)}
								data-active={activeCategory}
								onClick={() => setActiveCategory(elem)}
							>
								{elem} {categoryData[elem] || 0}
							</button>
						);
					})}
				</div>
				{!isLoading && (
					<div className={c.cards}>
						{bookmarksData.length > 0 ? (
							bookmarksData?.map((data, index) => (
								<MangaCard key={index} data={data} />
							))
						) : (
							<div className={c.noBookmark}>Нет ни одной закладки</div>
						)}
						{!isLoading && !isFetchingNextPage && hasNextPage && (
							<InView
								as="div"
								onChange={(inView) => inView && onScrollToEnd()}
							/>
						)}
					</div>
				)}
			</div>
		</section>
	);
}

export default BookmarksPage;
