import React, { useState, useEffect } from 'react'
import Axios from 'axios';

const Filter = ({ value, onChange }) => (
  <form onSubmit={e => e.preventDefault()}>
    <div>find countries: <input value={value} onChange={e => onChange(e.target.value)} /></div>
  </form>
);

const Weather = ({ country }) => {
  const [weather, setWeather] = useState('');

  useEffect(() => {
    const params = {
      access_key: process.env.REACT_APP_API_KEY.trim(),
      query: country.capital
    }

    Axios
      .get('http://api.weatherstack.com/current', { params })
      .then(({ data }) => {
        const current = data.current;
        console.log(current);

        if (!current) {
          setWeather(<h2>Weather unavailable in {country.capital}</h2>);
          return;
        }

        setWeather(
          <div>
            <h2>Weather in {country.capital}</h2>

            <div><b>temperature: </b>{current.temperature} Celcius</div>

            {current.weather_icons.map((icon, i) => (
              <img key={i} src={icon} alt={`${current.weather_descriptions[i]} icon`}></img>
            ))}

            <div><b>wind: </b>{current.wind_speed} mph direction {current.wind_dir}</div>
          </div>
        )
      });
  }, [country]);

  return weather;
}

const Countries = ({ filter, setFilter, countries }) => {

  const countriesFiltered = countries.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (countriesFiltered.length > 10)
    return <div>Too many matches, specify another filter</div>;

  if (countriesFiltered.length > 1)
    return (
      <div>
        {countriesFiltered.map(country =>
          <div key={country.numericCode}>
            {country.name}
            <button onClick={() => setFilter(country.name)}>show</button>
          </div>
        )}
      </div>
    )

  if (countriesFiltered.length === 1) {
    const country = countriesFiltered[0];

    return (
      <div>
        <h1>{country.name}</h1>

        <div>capital {country.capital}</div>
        <div>population {country.population}</div>

        <h2>Spoken languages</h2>
        <ul>
          {country.languages.map(lang => (
            <li key={lang.iso639_1}>{lang.name}</li>
          ))}
        </ul>

        <img src={country.flag} alt={`Flag of ${country.name}`} style={{ maxHeight: "125px" }}></img>

        <Weather country={country} />
      </div>
    );
  }

  return '';
}

const App = ({ phones }) => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    Axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(({ data }) => setCountries(data));
  }, []);

  return (
    <div>
      <Filter value={filter} onChange={setFilter} />
      <Countries filter={filter} setFilter={setFilter} countries={countries} />
    </div>
  )
}

export default App
