import { Image } from "../../App.types";
import css from "./ImageCard.module.css";

interface ImageCardProps {
  item: Image;
  openModal: (item: any) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ item, openModal }) => {
  return (
    <div>
      <img
        onClick={() => {
          openModal(item.urls.regular);
        }}
        className={css.image}
        src={item.urls.small}
        alt={item.description}
      />
    </div>
  );
};

export default ImageCard;
