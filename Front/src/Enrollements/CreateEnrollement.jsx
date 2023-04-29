import React, { useState } from "react";

function CreateEnrollment({ addCourse }) {
  const [studentID, setStudentID] = useState("");
  const [courseID, setCourseID] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addCourse({ studentID, courseID });
    setStudentID("");
    setCourseID("");

    fetch("http://localhost:3000/enrollements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studentID, courseID }),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Student ID:
        <input
          type="text"
          value={studentID}
          onChange={(e) => setStudentID(e.target.value)}
        />
      </label>
      <br />
      <label>
        Course ID:
        <input
          type="text"
          value={courseID}
          onChange={(e) => setCourseID(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Add Course</button>
    </form>
  );
}

export default CreateEnrollment;
