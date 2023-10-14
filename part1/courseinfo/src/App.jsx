const Header = ({course}) =>
    <h1>{course.name}</h1>;

const Part = ({name, exercises}) =>
    <p>{name} {exercises}</p>;

const Content = ({course}) =>
    <div>
        {course.parts.map(p =>
            <Part key={p.name} name={p.name} exercises={p.exercises}/>)}
    </div>;

const Total = ({course}) => {
    const count = course.parts.reduce((sum, p) => sum + p.exercises, 0);
    return (
        <p>Number of exercises {count}</p>
    );
}

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
            <Header course={course}/>
            <Content course={course}/>
            <Total course={course}/>
        </div>
    )
}

export default App;
