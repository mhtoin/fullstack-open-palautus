import React from 'react'

const Person = ({name, number, handleRemove}) => {
    return (
        <li key={name}>
            {name} {number} <button onClick={handleRemove}>delete</button>
        </li>
    )
}

export default Person