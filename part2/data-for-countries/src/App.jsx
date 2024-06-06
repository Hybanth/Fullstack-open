import { useState,useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import CountryList from './components/CountryList';
import CountryDetail from './components/CountryDetail';

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





export default App
