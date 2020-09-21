import React from 'react';
import PropTypes from 'prop-types';
import ForecastItem from './ForecastItem/ForecastItem';
import styles from './ForecastList.module.scss';

const forecastList = ({list}) => {
  return (
    <div className={styles.forecastList}>
      {list && list.map(item =>
        <ForecastItem key={item.dt} item={item}/>
      )}
    </div>
  )
}

forecastList.propTypes = {
  list: PropTypes.array.isRequired
};

export default forecastList;