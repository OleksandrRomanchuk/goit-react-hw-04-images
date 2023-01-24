import PropTypes from 'prop-types';

//========== styles ==========
import css from './ImageGalleryItem.module.css';

export function ImageGalleryItem ({getImageData, photoData: {largeImageURL, webformatURL, tags}}) {
    return <li className={css.ImageGalleryItem} >
        <a
            href={largeImageURL}
            data-alt={tags}
            onClick={getImageData}>
            <img
                className={css.ImageGalleryItemImage}
                src={webformatURL}
                alt={tags} />
        </a>
    </li>;
};

ImageGalleryItem.propTypes = {
    getImageData: PropTypes.func.isRequired,
    photoData: PropTypes.shape({
        largeImageURL: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    }),
};

