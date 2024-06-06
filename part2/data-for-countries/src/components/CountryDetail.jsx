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
  
  export default CountryDetail;
  