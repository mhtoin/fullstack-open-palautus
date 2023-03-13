const Header = (props) => {
  return (
    <>
    <h1>{props.course.name}</h1>
    </>
  )
}

const Content = (props) => {
  const Part = (props) => {
    return (
    <>
    <p>{props.name} {props.number}</p>
    </>
    )
  }
  return (
    <>
    <Part name={props.course.parts[0].name} number={props.course.parts[0].exercises} />
    <Part name={props.course.parts[1].name} number={props.course.parts[1].exercises} />
    <Part name={props.course.parts[2].name} number={props.course.parts[2].exercises} />
    </>
  )
}

const Total = (props) => {
  return (
  <>
  <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
  </>
  )
}

const App = () => {
  const course = {
  name: 'Half Stack application development 1',
  parts: [ 
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
}
  
  return (
    <div>
    <Header course={course} /> 
    <Content course={course} />
    <Total course={course} />
    </div>
  )
}

export default App