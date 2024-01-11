import MangaRec from "components/MangaRec";

import c from "./MangaSimilar.module.scss";

const MangaSimilar = () => {
	return (
		<div className={c.container}>
			<div className={c.textContainer}>
				<span className={c.text}>Похожее</span>
				{/* <Button>
          <Text $fontSize="15px" $color={theme.colors.primary}>
            Добавить
          </Text>
        </Button> */}
			</div>
			<MangaRec
				title="Безграничные пассивные навыки"
				src="https://i.ibb.co.com/M2yy1gz/poster.jpg"
				subtitle="Похож по сюжету"
			/>
		</div>
	);
};

export default MangaSimilar;
