import React from 'react';

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <p key={part.name}>
          {part.name} {part.exercises}
        </p>
      ))}
    </div>
  );
};

const Total = ({ total }) => {
  return <p>Total number of exercises {total}</p>;
};

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
  }

  const courseParts = course.parts

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <Header course={course}/>
      <Content parts={courseParts}/>
      <Total total={totalExercises}/>
    </div>
  )
}


export default App