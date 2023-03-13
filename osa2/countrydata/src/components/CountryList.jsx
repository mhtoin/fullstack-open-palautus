import React from 'react'
import Country from './Country'

const CountryList = ({countries, handleClick}) => {
    return (
        <ul>
            {countries.map(country=> 
                <Country key={country.name.common} name={country.name.common} handleClick={handleClick} />)}
        </ul>
    )
}

export default CountryList