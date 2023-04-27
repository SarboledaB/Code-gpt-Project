

import React, { useState } from 'react';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  const addCourse = (course) => {
    setCourses([...courses, course]);
  };

  const deleteCourse = (index) => {
    let newCourses = courses.filter((_, i) => i !== index);
    setCourses(newCourses);
  };

  const updateCourse = (index, course) => {
    let newCourses = courses.map((c, i) => {
      if (i === index) return course;
      return c;
    });

    setCourses(newCourses);
  };

  return (
    <div>
      <h1>CRUD for Courses</h1>

      <ul>{courses.map((course, index) => (
        <li key={index}>{course}</li>))}</ul>

      <button onClick={() => addCourse('New Course')}>Add Course</button>

      <button onClick={() => deleteCourse(0)}>Delete Course</button>

      <button onClick={() => updateCourse(0, 'Updated Course')}>Update Course</button>  

    </div>  
  );  
};  
export default Courses;