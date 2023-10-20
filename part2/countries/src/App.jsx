import {useEffect, useState} from "react";
import axios from "axios";
import weatherService from "./services/weatherService.js";

function Weather({city, temp, icon, description, wind}) {
    return (<>
        <h2>Weather in {city}</h2>
        <div>temperature {temp} Celcius</div>
        <img alt={description} src={icon}/>
        <div>wind {Math.round(wind * 100) / 100} m/s</div>
    </>);
}

function Country({country, onBackPressed}) {
    const [weather, setWeather] = useState(null);

    const languages = Object.keys(country.languages).map(key => country.languages[key]);
    languages.sort();

    useEffect(() => {
        const capital = country.capital[0];
        weatherService.getWeatherInCity(capital, response => {
            setWeather({city: capital, ...response});
        });

        return () => setWeather(null);

    }, [country]);

    return (<div>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital.join(', ')}</div>
        <div>area {country.area}</div>
        <h3>Languages</h3>
        <ul>
            {languages.map(language => <li key={language}>{language}</li>)}
        </ul>
        <img alt={country.flags.alt} src={country.flags.svg} height="150px"/>
        {weather ?
            <Weather {...weather}/> :
            <div>Loading weather...</div>}
        {onBackPressed && <div>
            <button onClick={onBackPressed}>back</button>
        </div>}
    </div>);
}

function CountryList({database, filter, onCountrySelected}) {
    if (!filter) {
        return null;
    }

    const filterUpperCase = filter.toUpperCase();
    const countries = database.filter(country => {
        return country.name.common.toUpperCase().includes(filterUpperCase);
    });

    if (countries.length === 0) {
        return <div>No country found, specify another filter</div>
    } else if (countries.length === 1) {
        return <Country country={countries[0]}/>
    } else if (countries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }

    return (<>
        {countries.map(country =>
            <div key={country.name.common}>{country.name.common}
                <button onClick={() => onCountrySelected(country.name.common)}>show</button>
            </div>
        )}
    </>)
}

function App() {
    const [countryDatabase, setCountryDatabase] = useState(null);
    const [findValue, setFindValue] = useState('');
    const [countrySelected, setCountrySelected] = useState(null);

    useEffect(() => {
        axios
            .get('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then(response => {
                response.data.sort((a, b) => a.name.common.localeCompare(b.name.common));
                setCountryDatabase(response.data);
            });
    }, []);

    if (!countryDatabase) {
        return <div>Loading database...</div>;
    }

    if (countrySelected !== null) {
        const handleBackPressed = () => {
            setCountrySelected(null);
        }
        const countrySelectedObject = countryDatabase.find(country => country.name.common === countrySelected);
        return <Country country={countrySelectedObject} onBackPressed={handleBackPressed}/>
    }

    const handleFindChange = (e) => {
        setFindValue(e.target.value);
    }

    return (<>
        <div>find countries <input name="search" value={findValue} onChange={handleFindChange}/></div>
        <CountryList database={countryDatabase} filter={findValue} onCountrySelected={setCountrySelected}/>
    </>);
}

export default App
