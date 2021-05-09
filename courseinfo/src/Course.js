const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Total = ({ course }) => {
  const total = course.parts.reduce((sum, part) => {
    sum = sum + part.exercises;
    return sum;
  }, 0);
  return <h3>Total of {total} excercises</h3>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

const RenderCourse = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => {
        return <Course course={course} key={course.id} />;
      })}
    </div>
  );
};

export default RenderCourse;
