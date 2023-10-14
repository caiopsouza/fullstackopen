const Header = ({course}) =>
    <h1>{course.name}</h1>;

const Part = ({name, exercises}) =>
    <p>{name} {exercises}</p>;

const Content = ({course}) =>
    <div>
        {course.parts.map(p =>
            <Part key={p.id} name={p.name} exercises={p.exercises}/>)}
    </div>;

const Total = ({course}) => {
    const count = course.parts.reduce((sum, p) => sum + p.exercises, 0);
    return (
        <strong>Total of {count} exercises</strong>
    );
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course}/>
            <Content course={course}/>
            <Total course={course}/>
        </div>
    )
}

export default Course;
