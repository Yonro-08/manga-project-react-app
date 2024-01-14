import useFetchMangaList from "hooks/query/useFetchMangaList";
import Slider from "../Slider/Slider";

import c from "./Recommendation.module.scss";

const Recommendation = () => {
	const { data, isLoading } = useFetchMangaList("recommend", 20);

	return (
		<section className={c.recommendation}>
			{!isLoading && data && <Slider data={data} />}
		</section>
	);
};

export default Recommendation;
