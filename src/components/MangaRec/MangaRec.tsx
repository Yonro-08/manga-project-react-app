import c from "./MangaRec.module.scss";

interface MangaRecProps {
  src: string;
  title: string;
  subtitle: string;
}

const MangaRec = ({ src, title, subtitle }: MangaRecProps) => {
  return (
    <div className={c.container}>
      <img className={c.image} src={src} />
      <div className={c.content}>
        <p data-text-column={2}>{title}</p>
        <p className={c.subtitle}>{subtitle}</p>
      </div>
    </div>
  );
};

export default MangaRec;
