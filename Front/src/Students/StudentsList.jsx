import React from "react";

const StudentList = (props) => {
  const studentList = props.students.map((student, index) => {
    return (
      <div key={index}>
        <p>StudentID: {student.StudentID}</p>
        <p>FirstName: {student.FirstName}</p>
        <p>LastName: {student.LastName}</p>
        <p>Email: {student.Email}</p>
        <p>Password: {student.Password}</p>
      </div>
    );
  });

  return <div className="student-list">{studentList}</div>;
};

export default StudentList;
