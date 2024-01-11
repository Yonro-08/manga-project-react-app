import useFetchMangaList from "hooks/query/useFetchMangaList";
import Slider from "../Slider";

import c from "./HotNew.module.scss";

const HotNew = () => {
	const { data, isLoading } = useFetchMangaList();

	return (
		<section className={c.hotNew}>
			<div className="container">
				<div className={c.container}>
					<h3 className={c.title}>Горячие новинки</h3>
					<button className={c.link}>Больше</button>
				</div>
				{!isLoading && data && <Slider data={data} width />}
			</div>
		</section>
	);
};

export default HotNew;
