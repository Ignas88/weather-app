import React, {useState, useEffect} from 'react';
import {getCurrentLocation, getWeatherAndForecast, getLocStorage, setLocStorage} from '../../services/services';
import AppTitle from '../../components/AppTitle/AppTitle';
import SearchForm from '../../components/SearchForm/SearchForm';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import WeatherInfo from '../WeatherInfo/WeatherInfo';

import styles from './WeatherApp.module.scss';

const WeatherApp = () => {
  const [moveTitle, setMoveTitle] = useState(false);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [favourites, setFavourites] = useState([]);

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
      let favourites = getLocStorage('favourites');
      favourites = favourites ? favourites : [];
      setFavourites(favourites);
      if (weather.error) {
        setError({message: '', showError: true});
        setMoveTitle(true);
        setWeather(null);
      } else {
        setMoveTitle(true);
        setWeather(weather.weatherInfo);
      }
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const weather = await getWeatherAndForecast(city, country, false);
    if (weather.error) {
      setError({message: '', showError: true});
      setMoveTitle(true);
      setWeather(null);
    } else {
      setError(null);
      setMoveTitle(true);
      setWeather(weather.weatherInfo);
      setCountry('');
      setCity('');
    }
  }

  const handleLikeClick = (selected) => {
    const liked = favourites.filter(({id}) => id === selected.id).length > 0;
    let newFavourites;
    if (!liked) {
      newFavourites = [...favourites, selected];
    } else {
      newFavourites = favourites.filter(({id}) => id !== selected.id);
    }
    setLocStorage('favourites', newFavourites);
    setFavourites(newFavourites);
  }

  return (
    <div className={styles.weatherApp}>
      <AppTitle showTitle={moveTitle} />
      <div className={styles.main}>
        <AppTitle secondary showTitle={moveTitle} />
        <SearchForm
          showResults={moveTitle} country={country} city={city} selectCountry={setCountry}
          onChange={(e) => setCity(e.target.value)} onSubmit={handleSubmit}
        />
        {weather ?
          <WeatherInfo
            liked={favourites.filter(({id}) => id === weather.id).length > 0} currentWeather={weather}
            onLikeClick={() => handleLikeClick(weather)}
          /> :
          null
        }
        {error ? <ErrorMessage error={error} /> : null}
        {favourites.length > 0 ?
          <div className={styles.favourites}>
            <h2>Favourites:</h2>
            {favourites.map((fav, i) =>
              <WeatherInfo key={i}
                liked={favourites.filter(({id}) => id === fav.id).length > 0} currentWeather={fav}
                onLikeClick={() => handleLikeClick(fav)}
              />
            )}
          </div> : null
        }
      </div>
    </div>
  );
}

export default WeatherApp;
