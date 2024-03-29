import React from 'react'

const PersonForm = (props) => {
    return (
    <form onSubmit={props.addName}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange}/>
        </div>
        <div>number: <input value={props.newNumber} onChange={props.handleNumberChange} /></div>
        <br />
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    )
}
export default PersonForm