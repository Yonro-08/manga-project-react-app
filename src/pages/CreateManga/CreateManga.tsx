import { useState } from "react";

import axios from "lib/axios";

import c from "./CreateManga.module.scss";

function CreateManga() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [chapterUploads, setChapterUploads] = useState<File[] | null>(null);
	const [poster, setPoster] = useState<File>();
	const [chapter, setChapter] = useState({
		endpoint: "",
		tom: "",
		num: "",
	});
	const [manga, setManga] = useState({
		title: {
			russianName: "",
			englishName: "",
			otherName: "",
		},
		content: "",
		typeManga: "Манга",
		year: "",
		genres: "",
	});

	const uploadImage = async (image: File) => {
		const formData = new FormData();
		formData.append("image", image);

		const response = await fetch(
			"https://api.imgbb.com/1/upload?key=60bebf1ab88a080084936eceed03b5ea",
			{
				method: "POST",
				body: formData,
			}
		);

		const data = await response.json();

		return data.data;
	};

	const handleClickChapter = async () => {
		if (!chapterUploads) return;
		const arrUrl = [];
		setIsLoading(true);

		for (const image of chapterUploads) {
			if (!image) return;
			const response = await uploadImage(image);
			arrUrl.push(response.image.url);
		}

		await axios.patch(`/manga/${chapter.endpoint}/chapters`, {
			chapterTom: chapter.tom,
			chapterNum: chapter.num,
			chapterImage: arrUrl,
		});

		setChapterUploads(null);
		setChapter({
			endpoint: "",
			tom: "",
			num: "",
		});

		setIsLoading(false);
	};

	const handleClickManga = async () => {
		if (!poster) return;
		setIsLoading(true);
		const response = await uploadImage(poster);

		await axios.post("/manga", {
			...manga,
			url: response.image.url,
		});

		setIsLoading(false);
	};

	return (
		<section>
			<div className="container">
				<div className={c.container}>
					<form className={c.createChapter}>
						<h2>Создание Главы</h2>
						<label className={c.label}>
							Endpoint:
							<input
								type="text"
								value={chapter.endpoint}
								onChange={(event) =>
									setChapter({ ...chapter, endpoint: event.target.value })
								}
							/>
						</label>
						<label className={c.label}>
							Номер Тома:
							<input
								type="text"
								value={chapter.tom}
								onChange={(event) =>
									setChapter({ ...chapter, tom: event.target.value })
								}
							/>
						</label>
						<label className={c.label}>
							Номер Главы:
							<input
								type="text"
								value={chapter.num}
								onChange={(event) =>
									setChapter({ ...chapter, num: event.target.value })
								}
							/>
						</label>
						<div className={c.containerUploads}>
							<label className={c.labelImg}>
								Загрузить файл
								<input
									type="file"
									multiple
									onChange={(event) => {
										if (!event.target.files) return;
										setChapterUploads(Array.from(event.target.files));
									}}
								/>
							</label>
							{chapterUploads && (
								<div>
									{chapterUploads.map((elem, index) => (
										<p key={index}>{elem.name}</p>
									))}
								</div>
							)}
						</div>
						{isLoading ? (
							<p>Loading...</p>
						) : (
							<button
								className={c.button}
								type="button"
								onClick={handleClickChapter}
							>
								Отправить
							</button>
						)}
					</form>
					<form className={c.createManga}>
						<h2>Создание Манги</h2>
						<label className={c.label}>
							Title:
							<input
								type="text"
								placeholder="Русское название"
								value={manga.title.russianName}
								onChange={(event) =>
									setManga({
										...manga,
										title: { ...manga.title, russianName: event.target.value },
									})
								}
							/>
							<input
								type="text"
								value={manga.title.englishName}
								placeholder="Английское название"
								onChange={(event) =>
									setManga({
										...manga,
										title: { ...manga.title, englishName: event.target.value },
									})
								}
							/>
							<input
								type="text"
								value={manga.title.otherName}
								placeholder="Другое название"
								onChange={(event) =>
									setManga({
										...manga,
										title: { ...manga.title, otherName: event.target.value },
									})
								}
							/>
						</label>
						<label className={c.label}>
							Описание
							<textarea
								defaultValue={manga.content}
								placeholder="Описание..."
								onChange={(event) =>
									setManga({
										...manga,
										content: event.target.value,
									})
								}
							/>
						</label>
						<label className={c.label}>
							Тип Манги
							<select
								value={manga.typeManga}
								onChange={(event) =>
									setManga({ ...manga, typeManga: event.target.value })
								}
							>
								<option value="Манга">Манга</option>
								<option value="Манхва">Манхва</option>
								<option value="Маньхуа">Маньхуа</option>
							</select>
						</label>
						<label className={c.label}>
							Год выпуска:
							<input
								type="number"
								value={manga.year}
								onChange={(event) =>
									setManga({ ...manga, year: event.target.value })
								}
							/>
						</label>
						<label className={c.label}>
							Жанры:
							<input
								type="text"
								value={manga.genres}
								onChange={(event) =>
									setManga({ ...manga, genres: event.target.value })
								}
							/>
						</label>
						<div className={c.containerUploads}>
							<label className={c.labelImg}>
								Загрузить Постер
								<input
									type="file"
									onChange={(event) => {
										if (!event.target.files) return;
										setPoster(event.target.files[0]);
									}}
								/>
							</label>
							{poster && (
								<div>
									<p>{poster.name}</p>
								</div>
							)}
						</div>
						{isLoading ? (
							<p>Loading...</p>
						) : (
							<button
								className={c.button}
								type="button"
								onClick={handleClickManga}
							>
								Отправить
							</button>
						)}
					</form>
				</div>
			</div>
		</section>
	);
}

export default CreateManga;
