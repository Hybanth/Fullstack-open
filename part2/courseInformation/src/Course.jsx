const Header = ({ course }) => <h1>{course.name}</h1>

const Part = ({part}) =>
  <p>
    {part.name} {part.exercises}
  </p>


const Content = ({parts}) =>
  <div>
       {parts.map(part => (
        <Part key={part.id} part={part} />
       ))}
  </div>

const Total = ({exercises}) =>
  <div><b>
     total of {exercises.reduce((total,part) =>total +part.exercises, 0)} exercises </b>
  </div>

 const Course = ({ course }) =>
   <>
    <Header course={course} />
    <Content parts={course.parts} />
    <Total exercises={course.parts} />
    </>