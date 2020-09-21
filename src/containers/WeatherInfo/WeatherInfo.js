import React from 'react';
import PropTypes from 'prop-types';
import ForecastList from '../../components/ForecastList/ForecastList';
import WeatherIcon from '../../components/WeatherIcon/WeatherIcon';
import WeatherStat from '../../components/WeatherStat/WeatherStat';
import {formatTemp} from '../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import styles from './WeatherInfo.module.scss';

const WeatherInfo = ({currentWeather, liked, onLikeClick}) => {
  const {forecast, city, country, date, icon, description, highestTemp, lowestTemp, temp, wind, sunrise, humidity, sunset} = currentWeather;
  return (
    <div className={styles.weatherInfo}>
      <div className={styles.location}>
        <h2>
          {city}, {country}
          <span style={{color: (liked ? 'darkred' : 'white')}} onClick={onLikeClick} >
            <FontAwesomeIcon icon={faHeart}/>
          </span>
        </h2>
        <h4>{date}</h4>
      </div>
      <div className={styles.currentDay}>
        <div className={styles.temp}>
          <WeatherIcon type={icon} description={description}/>
          <div>
            <h2>{formatTemp(temp)}&#176;</h2>
            <h3>{description}</h3>
          </div>
        </div>
        <div className={styles.stats}>
          <WeatherStat stat={`${formatTemp(highestTemp)}\u00B0`} label={'High'} />
          <WeatherStat stat={`${wind}mph`} label={'Wind'}/>
          <WeatherStat stat={sunrise} label={'Sunrise'}/>
          <WeatherStat stat={`${formatTemp(lowestTemp)}\u00B0`} label={'Low'}/>
          <WeatherStat stat={`${humidity}%`} label={'Rain'}/>
          <WeatherStat stat={sunset} label={'Sunset'}/>
        </div>
      </div>
      <ForecastList list={forecast}/>
    </div>
  )
}

WeatherInfo.propTypes = {
  currentWeather: PropTypes.object.isRequired,
  liked: PropTypes.bool.isRequired,
  onLikeClick: PropTypes.func.isRequired
};

export default WeatherInfo;