import { Link } from "react-router-dom";

import { BookmarkIcon, EyeIcon, HeartIcon, StarIcon } from "icons";
import { useManga } from "hooks/zustand/useManga";

import c from "./RightContentHeader.module.scss";

const RightContentHeader = () => {
  const { manga } = useManga();

  return (
    <div className={c.container}>
      <p className={c.subtitle}>
        {manga?.title.englishName}{" "}
        {manga?.title?.otherName && `/ ${manga?.title?.otherName}`}
      </p>
      <div className={c.titleContainer}>
        <h2 className={c.title}>{manga?.title.russianName}</h2>
        <Link to="" className={c.mangaStatus}>
          [{manga?.status}]
        </Link>
      </div>
      <div className={c.statsContainer}>
        <div className={c.statRating}>
          <StarIcon />
          8.5(голосов: 694)
        </div>
        <div className={c.stat}>
          <HeartIcon />
          51.4 K
        </div>
        <div className={c.stat}>
          <EyeIcon />
          406.1 K
        </div>
        <div className={c.stat}>
          <BookmarkIcon />
          5.3 K
        </div>
        <p className={c.statText}>{manga?.typeManga}</p>
        <p className={c.statText}>{manga?.year}</p>
      </div>
    </div>
  );
};

export default RightContentHeader;
