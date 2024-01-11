import { FC } from "react";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { MangaListProps } from "types/Manga";
import MangaItem from "../MangaItem";

import "swiper/css";
import "swiper/css/free-mode";

interface SliderProps {
	data: MangaListProps[];
	width?: boolean;
}

const Slider: FC<SliderProps> = ({ data, width }) => {
	return (
		<Swiper
			slidesPerView={"auto"}
			spaceBetween={4}
			freeMode={true}
			modules={[FreeMode]}
			className="mySwiper"
		>
			{data &&
				data.map((manga, index) => {
					return (
						<SwiperSlide key={index} style={{ width: "max-content" }}>
							<MangaItem manga={manga} width={width} />
						</SwiperSlide>
					);
				})}
		</Swiper>
	);
};

export default Slider;
