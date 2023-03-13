import React from 'react'
import Person from './Person'

const Numbers = (props) => {
    return (
        <ul>
            {props.numbersToShow.map(person =>
                <Person name={person.name} number={person.number} id={person.id}/> )}
        </ul>
    )
}
export default Numbers
