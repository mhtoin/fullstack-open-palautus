import React from 'react'

const Header = ({name}) => {
    return (
        <>
            <h1>{name}</h1>
        </>
    )
}

const Part = ({name, number}) => {
    return (
        <>
            <p>{name} {number}</p>
        </>
    )
}

const Content = ({parts}) => {
    return (
        <>
            {parts.map(part =>
                <Part key={part.id} name={part.name} number={part.exercises} />
            )}
        </>
    )
}

const Total = ({parts}) => {
    const totalAmount = parts.reduce((x, y) =>
        (x + y.exercises), 0)

    return (
        <>
            <p>Total number of exercises {totalAmount}
            </p>
        </>
    )
}

const Course = (props) => {
    return (
        <>
            <Header name={props.course.name} />
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts} />
        </>
    )
}

export default Course