import { useState, useEffect, useRef } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import { fetchPhotos } from "./photos-api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { Image } from "./App.types";

export const perPage: number = 18; // Кількість зображень що повертаються з API за один запит

export default function App() {
  const [photos, setPhotos] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");

  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<Image | null>(null);

  // Реалізація плавного скролу при додаванні нових зображень
  const firstNewImageRef = useRef<HTMLLIElement | null>(null);

  useEffect((): void => {
    // firstNewImageRef.current && firstNewImageRef.current.scrollIntoView({ behavior: "smooth" });
    // Використання оператора опціональної послідовності ?. замість &&
    firstNewImageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [photos]);

  const handleSearch = (newQuery: string) => {
    if (newQuery === query) {
      return;
    }
    setQuery(newQuery);
    setPage(1);
    setPhotos([]);
  };

  const handleLoadMore = (): void => {
    setPage(page + 1);
  };

  const openModal = (image: Image): void => {
    setCurrentImage(image);
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (query === "") {
      return;
    }

    async function getPhotos() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await fetchPhotos(query, page);
        setPhotos((prevPhotos) => {
          return [...prevPhotos, ...data];
        });
      } catch (error) {
        setError(true);
        setPhotos([]);
      } finally {
        setIsLoading(false);
      }
    }

    getPhotos();
  }, [page, query]);

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {photos.length > 0 && (
        <ImageGallery
          ref={firstNewImageRef}
          openModal={openModal}
          items={photos}
          perPage={perPage}
        />
      )}
      {error && <ErrorMessage />}
      {isLoading && <Loader loading={isLoading} />}
      {!isLoading && photos.length > 0 && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        image={currentImage}
      />
    </div>
  );
}
