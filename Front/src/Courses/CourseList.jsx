import React from "react";

const CourseList = (props) => {
  const { courses } = props;

  return (
    <div>
      <h2>Course List</h2>
      <table>
        <thead>
          <tr>
            <th>CourseID</th>
            <th>CourseName</th>
            <th>Description</th>
            <th>Instructor</th>
            <th>StartTime</th>
            <th>EndTime</th>
            <th>Location</th>{" "}
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.courseId}>
              <td>{course.courseId} </td>
              <td>{course.courseName} </td>
              <td>{course.description} </td>
              <td>{course.instructor} </td>
              <td>{course.startTime} </td>
              <td>{course.endTime} </td>
              <td>{course.location} </td>
              <td>
                <button onClick={() => props.deleteCourse(course.courseId)}>
                  Delete Course
                </button>
              </td>
              <td>
                <button onClick={() => props.updateCourse(course.courseId)}>
                  Update Course
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default CourseList;
