import React, { useState } from "react";

const CreateStudentForm = () => {
  const [student, setStudent] = useState({
    studentID: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Submit the student to the server here

    setStudent({
      studentID: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    }); // Reset the form after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="studentID">Student ID</label>
      <input
        type="text"
        name="studentID"
        value={student.studentID}
        onChange={handleChange}
      />
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        name="firstName"
        value={student.firstName}
        onChange={handleChange}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        name="lastName"
        value={student.lastName}
        onChange={handleChange}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        value={student.email}
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        value={student.password}
        onChange={handleChange}
      />
      <button type="submit">Create Student</button> {/* Submit button */}{" "}
    </form>
  );
};
export default CreateStudentForm;
