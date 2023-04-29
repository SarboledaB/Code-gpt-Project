import React, { useState } from "react";

function CreateEnrollment({ addEnrollement }) {
  const [studentID, setStudentID] = useState("");
  const [courseID, setCourseID] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addEnrollement({ studentID, courseID });
    setStudentID("");
    setCourseID("");
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
