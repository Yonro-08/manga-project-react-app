import c from "./AboutPage.module.scss";

interface AboutPageProps {}

function AboutPage({}: AboutPageProps) {
	return (
		<div className={c.aboutPage}>
			<div className="container">
				<div className={c.container}>
					<div>
						<strong>Мы</strong> - крупнейшая площадка для чтения манг, маньхуа,
						манхв и комиксов, где вы всегда сможете найти все ваши любимые
						произведения и читать их первыми на нашем сайте.
					</div>
					<div>
						Площадка собрала в себе лучшие качества: регулярный и самый быстрый
						выход глав, комфортный интерфейс, отзывчивая модерация и интересные
						фичи.
					</div>
					<div>
						Наш девиз - быстро и качественно! Каждый день сотрудники работают
						над улучшением сайта, чтобы вам, дорогие читатели, было максимально
						комфортно провести своё время. Всем приятного чтения!
					</div>
				</div>
			</div>
		</div>
	);
}

export default AboutPage;
