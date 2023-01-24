import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { disableScroll, enableScroll } from 'helpers/preventScroll';

//========== components ==========
import { useEffect } from 'react';

//========== styles ==========
import css from './Modal.module.css';

const modalPortal = document.getElementById('modal-root');

export function Modal({ modalToggle, children }) {
    useEffect(() => {
        const onKeyDown = (event) => {
        if (event.code === 'Escape') {
            modalToggle();
            };
        };
        
        disableScroll();
        window.addEventListener('keydown', onKeyDown);

        return () => {
            enableScroll();
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [modalToggle]);
    
    const onModalOpen = (event) => {
        if (event.target.nodeName !== 'IMG') {
            modalToggle();
        };
    };

    return createPortal(<div className={css.Overlay} onClick={onModalOpen}>
        <div className={css.Modal}>
            {children}
        </div>
    </div>, modalPortal);
};

Modal.propTypes = {
    modalToggle: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};