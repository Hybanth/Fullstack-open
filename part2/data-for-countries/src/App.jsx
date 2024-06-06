import { useState,useEffect } from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  useEffect(() => {
    if (search) {
      const result = countries.filter(country =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCountries(result);
    } else {
      setFilteredCountries([]);
    }
  }, [search, countries]);

  const handleSearchChange = event => {
    setSearch(event.target.value);
  };

  return (
    <>
      <Filter search={search} handleSearchChange={handleSearchChange} />
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length === 1 ? (
        <CountryDetail country={filteredCountries[0]} />
      ) : (
        <CountryList countries={filteredCountries} />
      )}
    </>
  )
}

const Filter = ({ search, handleSearchChange }) => {
  return (
    <div>
      find countries <input value={search} onChange={handleSearchChange} />
    </div>
  );
};

const CountryList = ({ countries }) => {
  return (
    <ul>
      {countries.map(country => (
        <li key={country.cca3}>{country.name.common}</li>
      ))}
    </ul>
  );
};

const CountryDetail = ({ country }) => {
  return (
    <div>
      <h3>{country.name.common}</h3>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km²</p>
      <h4>Languages</h4>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="200" />
    </div>
  );
};


export default App
