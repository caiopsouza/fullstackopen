import React from 'react'
import ReactDOM from 'react-dom'

const Header = props => (
  <h1>{props.course}</h1>
);

const Part = ({ name, exercises }) => (
  <p>{name} {exercises}</p>
);

const Content = props => (
  <div>
    <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
    <Part name={props.parts[1].name} exercises={props.parts[1].exercises} />
    <Part name={props.parts[2].name} exercises={props.parts[2].exercises} />
  </div>
);

const Total = props => (
  <p>Number of exercises {props.exercises.reduce((x, y) => x + y)}</p>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
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
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts.map(c => c.exercises)} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))