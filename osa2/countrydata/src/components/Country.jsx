import React from 'react'

const Country = ({name, handleClick}) => {
    return (
        <li key={name}>
            {name} <button onClick={() => handleClick(name)}>Show</button>
        </li>
    )
}

export default Country