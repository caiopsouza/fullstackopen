import React from 'react'

const Header = props => (
  <h2>{props.course}</h2>
);

const Part = ({ name, exercises }) => (
  <p>{name} {exercises}</p>
);

const Total = props => (
  <b>total of {props.exercises.reduce((x, y) => x + y, 0)} exercises</b>
)

const Content = ({ parts }) => (
  <div>
    {parts.map(part =>
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    )}
  </div>
);

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total exercises={course.parts.map(c => c.exercises)} />
  </div>
);

export default Course;
