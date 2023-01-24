import PropTypes from 'prop-types';

//========== components ==========
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

//========== styles ==========
import css from './ImageGallery.module.css';

export function ImageGallery({ items, getImageData }) {
    return <ul className={css.ImageGallery} id="gallery">
        {items
            .map(item =>
                <ImageGalleryItem
                    key={item.id}
                    photoData={item}
                    getImageData={getImageData}
                />)}
    </ul>;
};

ImageGallery.propTypes = {
    getImageData: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        largeImageURL: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    })),
};