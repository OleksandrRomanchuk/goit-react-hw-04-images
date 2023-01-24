import PropTypes from 'prop-types';

//========== components ==========
import { useState } from 'react';
import { FcSearch } from "react-icons/fc";

//========== styles ==========
import css from './Searchbar.module.css';

export function Searchbar({ onSubmit }) {
    const [query, setQuery] = useState('');

    const onInputChange = (event) => { 
        const value = event.target.value;

        setQuery(value);
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        onSubmit(query);
    }

    return <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={onFormSubmit}>
            <button type="submit" className={css.SearchFormBtn}>
                <FcSearch style={{ fontSize: "24px" }} />
                <span className={css.SearchFormBtnLabel}>Search</span>
            </button>
            <input
                onChange={onInputChange}
                className={css.SearchFormInput}
                name="query"
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
            />
        </form>
    </header>;
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

