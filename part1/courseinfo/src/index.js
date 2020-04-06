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
    <Part name={props.courses[0].name} exercises={props.courses[0].exercises} />
    <Part name={props.courses[1].name} exercises={props.courses[1].exercises} />
    <Part name={props.courses[2].name} exercises={props.courses[2].exercises} />
  </div>
);

const Total = props => (
  <p>Number of exercises {props.exercises.reduce((x, y) => x + y)}</p>
)

const App = () => {

  const course = 'Half Stack application development'

  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  };
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  };
  const part3 = {
    name: 'State of a component',
    exercises: 14
  };

  const courseExercises = [part1, part2, part3];

  return (
    <div>
      <Header course={course} />
      <Content courses={courseExercises} />
      <Total exercises={courseExercises.map(c => c.exercises)} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))