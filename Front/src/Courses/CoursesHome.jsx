import React, { useEffect, useState } from "react";
import CourseForm from "./CreateCourse";
import CourseList from "./CourseList";

const CoursesHome = () => {
  const [courses, setCourses] = useState([]);

  const getCourses = () => {
    fetch("http://localhost:3000/courses")
      .then((response) => response.json())
      .then((data) => setCourses(data)) // not check yet!
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    // getCourses();
  }, []);

  const addCourse = (course) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course),
    };

    fetch("http://localhost:3000/courses", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
    setCourses([...courses, course]);
  };

  const deleteCourse = (id) => {
    // fetch(`http://localhost:3000/courses/${id}`, {
    //   method: "DELETE",
    // })
    //   .then(() => {
    //     getCourses();
    //   })
    //   .catch((err) => alert(err));
  };

  const updateCourse = (index, course) => {
    // fetch(`http://localhost:3000/courses/${id}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then(() => {
    //     getCourses();
    //   })
    //   .catch((err) => alert(err));
  };

  return (
    <div>
      <h1>CRUD for Courses</h1>

      <CourseList
        courses={courses}
        deleteCourse={deleteCourse}
        updateCourse={updateCourse}
      ></CourseList>
      <CourseForm submit={addCourse}></CourseForm>
    </div>
  );
};
export default CoursesHome;
