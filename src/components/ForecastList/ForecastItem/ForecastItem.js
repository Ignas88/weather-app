import React from 'react';
import PropTypes from 'prop-types';
import WeatherIcon from '../../WeatherIcon/WeatherIcon';
import {formatTemp} from '../../../utils/utils';
import styles from './ForecastItem.module.scss';

const forecastItem = ({item}) => {
  const {weather, dt_txt, main} = item;
  return (
    <div className={styles.forecastItem}>
      <div>{dt_txt.slice(5, 7)}.{dt_txt.slice(8, 10)}</div>
      <div>{dt_txt.slice(11, 13) * 1}:00</div>
      <WeatherIcon type={weather[0].icon} description={weather[0].description} />
      <div>{formatTemp(main.temp)}&#176;</div>
    </div>
  )
}

forecastItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default forecastItem;