import React from 'react'
import ReactDOM from 'react-dom'

const Header = props => (
  <h1>{props.course}</h1>
);

const Part = props => (
  <p>{props.name} {props.exercises}</p>
);

const Content = props => (
  <div>
    <Part name={props.courses[0].part} exercises={props.courses[0].exercises} />
    <Part name={props.courses[1].part} exercises={props.courses[1].exercises} />
    <Part name={props.courses[2].part} exercises={props.courses[2].exercises} />
  </div>
);

const Total = props => (
  <p>Number of exercises {props.exercises.reduce((x, y) => x + y)}</p>
)

const App = () => {
  const course = 'Half Stack application development'

  const courseExercises = [
    { part: 'Fundamentals of React', exercises: 10 },
    { part: 'Using props to pass data', exercises: 7 },
    { part: 'State of a component', exercises: 14 },
  ]

  return (
    <div>
      <Header course={course} />
      <Content courses={courseExercises} />
      <Total exercises={courseExercises.map(c => c.exercises)} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))