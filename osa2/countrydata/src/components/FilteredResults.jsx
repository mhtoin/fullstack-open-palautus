import React from 'react'
import Country from './Country'
import CountryDetail from './CountryDetail'
import CountryList from './CountryList'

const FilteredResults = ({countries, handleClick}) => {
    if (countries.length > 10) {
        return (
            <>
            Too many matches, specify another filter</>
        )
    }

    if (countries.length > 1 && countries.length <= 10) {
        return (
            <>
            <CountryList handleClick={handleClick} countries={countries}/>
            </>
            
        )
    }

    if (countries.length == 1) {
        console.log(countries.length)
        return (
            <>
            <CountryDetail country={countries[0]} /> </>
        )
    }
    
}

export default FilteredResults