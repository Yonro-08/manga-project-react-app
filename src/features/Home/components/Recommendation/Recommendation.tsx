import Slider from "../Slider/Slider";
import useFetchMangaList from "hooks/query/useFetchMangaList";

import c from "./Recommendation.module.scss";

const Recommendation = () => {
	const { data, isLoading } = useFetchMangaList();

	return (
		<section className={c.recommendation}>
			{!isLoading && data && <Slider data={data} />}
		</section>
	);
};

export default Recommendation;
