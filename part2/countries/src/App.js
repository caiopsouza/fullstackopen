import React, { useState, useEffect } from 'react'
import Axios from 'axios';

const Filter = ({ value, onChange }) => (
  <form onSubmit={e => e.preventDefault()}>
    <div>find countries: <input value={value} onChange={e => onChange(e.target.value)} /></div>
  </form>
);

const Countries = ({ filter, countries }) => {
  const countriesFiltered = countries.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (countriesFiltered.length > 10)
    return <div>Too many matches, specify another filter</div>;

  if (countriesFiltered.length > 1)
    return (
      <div>
        {countriesFiltered.map(country =>
          <div key={country.numericCode}>{country.name}</div>
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

        <h1>languages</h1>
        <ul>
          {country.languages.map(lang => (
            <li key={lang.iso639_1}>{lang.name}</li>
          ))}
        </ul>

        <img src={country.flag} alt={`Flag of ${country.name}`} style={{ maxHeight: "125px" }}></img>
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
      <Countries filter={filter} countries={countries} />
    </div>
  )
}

export default App
