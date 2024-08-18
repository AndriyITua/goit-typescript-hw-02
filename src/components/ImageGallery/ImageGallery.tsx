import ImageCard from "../ImageCard/ImageCard";
import { forwardRef, Ref } from "react";
import { Image } from "../../App.types.js";
import css from "./ImageGallery.module.css";

interface ForwardRefProps {
  items: Image[];
  openModal: (item: string) => void;
  perPage: number;
  ref?: React.Ref<HTMLLIElement>;
}

const ImageGallery = forwardRef<HTMLLIElement, ForwardRefProps>(
  ({ items, openModal, perPage }, ref) => {
    const newImageIndex = items.length - perPage;
    // Функція перевірки співпадіння індексу масиву зображень
    // Повертає true або false
    const isNewImage = (index: number) => index === newImageIndex;

    return (
      <ul className={css.list}>
        {/* Набір елементів списку із зображеннями */}
        {items.map((item: Image, index: number) => {
          return (
            <li
              className={css.item}
              key={item.id}
              ref={isNewImage(index) ? ref : null}
            >
              <ImageCard item={item} openModal={openModal} />
            </li>
          );
        })}
      </ul>
    );
  }
);

// Обов'язкове додавання відображуваного ім'я у визначені компонента на вимогу eslint
// ImageGallery.displayName = "ImageGallery";

export default ImageGallery;
