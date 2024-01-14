import MangaItem from "features/Home/components/MangaItem";
import useFetchMangaList from "hooks/query/useFetchMangaList";
import c from "./CatalogPage.module.scss";

interface CatalogPageProps {}

function CatalogPage({}: CatalogPageProps) {
	const { data } = useFetchMangaList("all");

	if (!data) return null;

	return (
		<section className={c.catalogPage}>
			<div className="container">
				<h1 className={c.title}>Каталог</h1>
				<div className={c.cards}>
					{data.map((elem) => {
						return <MangaItem manga={elem} isCatalog />;
					})}
				</div>
			</div>
		</section>
	);
}

export default CatalogPage;
