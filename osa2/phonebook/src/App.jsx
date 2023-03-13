import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import personService from './services/personService'
import Notification from './components/Notification'
import './App.css'

function App() {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filterStr, setNewFilterStr] = useState('')
  const [ notification, setNotification] = useState(null)
  const [ errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
    .getAll()    
    .then(personData => {
      setPersons(personData)
    })
  }, [])

  const addName = (event) => {
      event.preventDefault()
      const personObject = {
          name: newName,
          number: newNumber
        }

        const nameExists = persons
        .map(person => person.name)
        .includes(newName)

        if (nameExists) {
          let confirm = window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)
          
          if (confirm) {
            personService
            .update(persons.find(person => person.name === newName).id, personObject)
            .then(returnedPerson => {
              setPersons(persons.filter(person => person.name !== newName).concat(returnedPerson))
              setNotification(`Updated number for ${returnedPerson.name}`)
              setTimeout(() => {
                setNotification(null)
              }, 5000)
              setNewName('')
              setNewNumber('')
            })
            .catch(error => {
              setErrorMessage(`${newName} has already been removed from the server`)
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
              setPersons(persons.filter(person => person.id !== persons.find(person => person.name === newName).id))
            })
            return
          }
      }

      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotification(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
  }

  const handleNameChange = (event) => {
      console.log(event.target.value)
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
      console.log(event.target.value)
      setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
      console.log(event.target.value)
      setNewFilterStr(event.target.value)
      console.log(numbersToShow)
  }

  const handleRemove = (personId) => {
    let personName = persons.find(person => person.id === personId).name
    return (() => {
      let confirm = window.confirm(`Delete ${personName}?`)

      if (confirm) {
        personService
      .remove(personId)
      .then( () => {
        setPersons(persons.filter(person => person.id !== personId))
      })
    }
  })
}

  const numbersToShow = filterStr ? persons
  .filter(person => person.name.toLowerCase().includes(filterStr.toLowerCase()))
  : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={'notification'} />
      <Notification message={errorMessage} type={'error'} />
      <Filter value={filterStr} onChange={handleFilterChange} />
      <h2>Add a new number</h2>
      <PersonForm 
      addName={addName}
      newName={newName}
      newNumber={newNumber}
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      {console.log(numbersToShow)}
      <ul>
            {numbersToShow.map(person => 
                <Person key={person.id} name={person.name} number={person.number} handleRemove={handleRemove(person.id)}/>)}
        </ul>
    </div>
  )
}

export default App
