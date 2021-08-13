import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import LoaderComponent from "./components/LoaderComponent/LoaderComponent";
import ErrorView from "./components/ErrorView/ErrorView";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import services from "./components/services/apiService";
import Modal from "./components/Modal/Modal";
import { app } from "./App.module.css";

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!query) return;
    const fetchImages = async () => {
      try {
        const request = await services(query, page);
        if (request.length === 0) {
          return setError(`No results were found for ${query}!`);
        }
        setImages((prevImages) => [...prevImages, ...request]);
      } catch (error) {
        setError("Something went wrong. Try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [page, query]);

  const searchImages = (newSearch) => {
    setQuery(newSearch);
    setImages([]);
    setPage(1);
    setError(null);
    setIsLoading(true);
  };

  const onLoadMore = () => {
    setIsLoading(true);
    setPage((prevPage) => prevPage + 1);
    scrollPage();
  };

  const onOpenModal = (e) => {
    setLargeImageURL(e.target.dataset.source);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const scrollPage = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 160,
        behavior: "smooth",
      });
    }, 800);
  };

  return (
    <div className={app}>
      <SearchBar onHandleSubmit={searchImages} />

      {error && <ErrorView texterror={error} />}

      {images.length > 0 && !error && (
        <ImageGallery images={images} onOpenModal={onOpenModal} />
      )}

      {isLoading && <LoaderComponent />}

      {!isLoading && images.length >= 12 && !error && (
        <Button onLoadMore={onLoadMore} />
      )}

      {showModal && (
        <Modal onToggleModal={toggleModal} largeImageURL={largeImageURL} />
      )}
      <ToastContainer autoClose={3700} />
    </div>
  );
}

export default App;
