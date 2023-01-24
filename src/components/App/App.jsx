import { fetchImages } from 'API/API';
import { scrollingAfterMoreLoad } from 'helpers/autoScroll';

//========== components ==========
import { useState, useEffect } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Notification } from 'components/Notification/Notification';
import { Button } from 'components/Button/Button';
import { ThreeDots  } from 'react-loader-spinner';
import { Modal } from 'components/Modal/Modal';

//========== styles ==========
import css from './App.module.css';

export function App() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState('Enter a search query to get a photo.');
  const [largeImage, setLargeImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    setIsLoading(true);
    setNotifyMessage('');

    fetchImages(query, page)
      .then(({ hits }) => {
        if (hits.length === 0) {
          setNotifyMessage('No photos were found for your request.');
          return;
        };

        const photosInfo = hits.map(({ id, largeImageURL, webformatURL, tags }) => {
          return { id, largeImageURL, webformatURL, tags }
        });

        setPhotos(state => [...state, ...photosInfo]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, page]);

  useEffect(() => {
    if (photos.length <= 12) return;

    scrollingAfterMoreLoad();
  }, [photos]);

  const setQueryWord = (string) => {
    if (string === query) return;

    setPhotos('');
    setPage(1);
    setQuery(string);
  };

  const setChosenImage = (event) => {
    event.preventDefault();
    
    const modalImageData = {
      url: event.currentTarget.href,
      alt: event.currentTarget.dataset.alt,
    };

    setLargeImage(modalImageData)
    setIsModalOpen(!isModalOpen);
  };

  return <div className={css.App}>
    <Searchbar onSubmit={setQueryWord} />
    {photos[0] ? <>
      <ImageGallery
        items={photos}
        modalOpen={() => setIsModalOpen(!isModalOpen)}
        getImageData={setChosenImage} />
      {!isLoading && <Button
        type="button"
        label="Load more"
        changePageNumber={() => setPage(state => state + 1)} />}
    </> : <Notification message={notifyMessage} />}
    {isLoading && <div className={css.Loader}>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>}

    {isModalOpen
      && <Modal
        modalToggle={() => setIsModalOpen(!isModalOpen)}>
        <img
          src={largeImage.url}
          alt={largeImage.alt} />
      </Modal>}
  </div>;
};
  
