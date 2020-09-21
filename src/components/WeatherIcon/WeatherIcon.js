import React from 'react';
import PropTypes from 'prop-types';
import day from '../../assets/img/day.svg';
import night from '../../assets/img/night.svg';
import dayCloudy from '../../assets/img/day-cloudy.svg';
import nightCloudy from '../../assets/img/night-cloudy.svg';
import cloudy from '../../assets/img/cloudy.svg';
import hail from '../../assets/img/hail.svg';
import dayRain from '../../assets/img/day-rain.svg';
import nightRain from '../../assets/img/night-rain.svg';
import thunder from '../../assets/img/thunder.svg';
import daySnow from '../../assets/img/day-snow.svg';
import nightSnow from '../../assets/img/night-snow.svg';
import sleet from '../../assets/img/sleet.svg';

const weatherIcon = ({type, description}) => {
  const ICON_TYPES = {
    '01d': day,
    '01n': night,
    '02d': dayCloudy,
    '02n': nightCloudy,
    '03d': cloudy,
    '03n': cloudy,
    '04d': cloudy,
    '04n': cloudy,
    '09d': hail,
    '09n': hail,
    '10d': dayRain,
    '10n': nightRain,
    '11d': thunder,
    '11n': thunder,
    '13d': daySnow,
    '13n': nightSnow,
    '50d': sleet,
    '50n': sleet,
  }

  return <img src={ICON_TYPES[type]} alt={description}/>
}

weatherIcon.propTypes = {
  type: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default weatherIcon;