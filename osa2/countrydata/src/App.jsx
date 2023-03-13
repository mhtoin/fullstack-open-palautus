import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FilterForm from './components/FilterForm'
import Country from './components/Country'
import FilteredResults from './components/FilteredResults'

const App = () => {
  const [ countries, setCountries] = useState([])
  const [filterVal, setFilterVal] = useState('')

  useEffect(() => { 
    axios
    .get('https://restcountries.com/v3.1/all')      
    .then(response => {console.log('request complete', response)
    setCountries(response.data) })
  }, [])

  const handleFilterChange = (event) => {
      console.log(event.target.value)
      setFilterVal(event.target.value)
  }

  const handleClick = (name) => {
    console.log('clicked', name)
    setFilterVal(name)
  }

  const filteredCountries = filterVal ? countries
  .filter(country => country.name.common.toLowerCase().includes(filterVal.toLowerCase()))
  : []

  return (
    <div>
      <FilterForm value={filterVal} onChange={handleFilterChange} />
      <FilteredResults countries={filteredCountries} handleClick={handleClick}/>
    </div>
  )

}

export default App