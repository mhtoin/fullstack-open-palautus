import React from 'react'

const CountryDetail = ({country}) => {
    console.log('detail props', country.languages)
    return (
        <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital.map(capital => capital).join(',')}</p>
        <p>Area: {country.area}</p>
        <h2>Languages</h2>
        <ul>
            {Object.keys(country.languages).map(key =>
                <li key={key}>{country.languages[key]}</li>)}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt}></img>
        </div>
    )
}

export default CountryDetail