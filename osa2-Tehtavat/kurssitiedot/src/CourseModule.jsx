const Header = ({ courseName }) => {
    return <h2>{courseName}</h2>;
  };
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => (
          <Part key={part.name} name={part.name} exercises={part.exercises} />
        ))}
      </div>
    )
  }
  
  const Course = ({course}) => {
    const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);
  
    return(
      <div>
        <Header courseName= {course.name}/>
        <Content parts={course.parts}/>
        <div>total of {totalExercises} exercises</div>
      </div>
    )
  }
  
  const Part = ({ name, exercises }) => {
    return <p>{name} {exercises}</p>;
  };

  export default Course