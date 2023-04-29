import React, { useEffect, useState } from "react";
import CreateStudentForm from "./CreateStudent";
import StudentList from "./StudentsList";

const StudentsHome = () => {
  const [students, setStudents] = useState([]);

  const getStudents = () => {
    fetch("http://localhost:3000/students")
      .then((response) => response.json())
      .then((data) => setStudents(data)) // not check yet!
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getStudents();
  }, []);

  const addStudent = (student) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    };

    fetch("http://localhost:3000/students", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
    setStudents([...students, student]);
  };

  const deleteStudent = (id) => {
    fetch(`http://localhost:3000/students/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        getStudents();
      })
      .catch((err) => alert(err));
  };

  const updateStudents = (index, student) => {
    fetch(`http://localhost:3000/students/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        getStudents();
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      <h1>Students</h1>
      <StudentList
        students={students}
        deleteStudent={deleteStudent}
        updateStudent={updateStuden}
      />
      <CreateStudentForm submit={addStudent} />
    </>
  );
};
export default StudentsHome;
