import React from 'react';
import PropTypes from 'prop-types';
import { CountryDropdown } from 'react-country-region-selector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

import styles from './SearchForm.module.scss';

const searchForm = ({showResults, country, city, selectCountry, onSubmit, onChange}) => {
  return (
    <>
      <form className={`${styles.searchForm} ${showResults ? styles.higher : ''}`} onSubmit={onSubmit}>
        <CountryDropdown value={country} onChange={selectCountry} valueType="short" />
        <input type="text" value={city} placeholder="Find city" disabled={!country} onChange={onChange}/>
        <span onClick={onSubmit} style={{color: (city ? '#1976d2' : '#777')}}>
          <FontAwesomeIcon icon={faSearch}/>
        </span>
      </form>
    </>
  )
}

searchForm.propTypes = {
  showResults: PropTypes.bool.isRequired,
  country: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  selectCountry: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default searchForm;