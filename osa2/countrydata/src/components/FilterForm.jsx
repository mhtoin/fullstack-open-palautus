import React from 'react'

const FilterForm = ({value, onChange}) => {
    return (
        <div>
            Find countries: <input value={value} onChange={onChange}>
            </input>
        </div>
    )
}

export default FilterForm