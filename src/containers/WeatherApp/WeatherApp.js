import React, {useState, useEffect} from 'react';
import {getCurrentLocation, getWeatherAndForecast} from '../../services/services';
import AppTitle from '../../components/AppTitle/AppTitle';
import SearchForm from '../../components/SearchForm/SearchForm';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import styles from './WeatherApp.module.scss';

const WeatherApp = () => {
  const [moveTitle, setMoveTitle] = useState(false);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    (async () => await loadData())();
  }, []);

  const loadData = async () => {
    const location = await getCurrentLocation();
    if (location.error) {
      setError({message: location.err.message, showError: true});
      setMoveTitle(true);
    } else {
      const {latitude, longitude} = location.position.coords;
      const weather = await getWeatherAndForecast(latitude, longitude, true);
      if (weather.error) {
        setError({message: '', showError: true});
        setMoveTitle(true);
      } else {
        console.log(weather)
        setMoveTitle(true);
        setWeather(weather);
      }
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const weather = await getWeatherAndForecast(city, country, false);
    if (weather.error) {
      setError({message: '', showError: true});
      setMoveTitle(true);
    } else {
      console.log(weather)
      setMoveTitle(true);
      setWeather(weather);
    }
  }

  return (
    <div className={styles.weatherApp}>
      <AppTitle showTitle={moveTitle} />
      <div className={styles.container}>
        <AppTitle secondary showTitle={moveTitle} />
        <SearchForm
          showResults={moveTitle} country={country} city={city} selectCountry={setCountry}
          onChange={(e) => setCity(e.target.value)} onSubmit={handleSubmit}
        />
        {error ? <ErrorMessage error={error} /> : null}
      </div>
    </div>
  );
}

export default WeatherApp;
