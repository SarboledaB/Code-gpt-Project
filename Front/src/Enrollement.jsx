import React, { useState } from 'react';

function CourseEnrollment() {
  const [courseName, setCourseName] = useState('');
  const [studentName, setStudentName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Course Name: ${courseName}, Student Name: ${studentName}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Course Name</label>
      <input type="text" value={courseName} onChange={(event) => setCourseName(event.target.value)} />

      <label>Student Name</label>
      <input type="text" value={studentName} onChange={(event) => setStudentName(event.target.value)} />

      <button type="submit">Submit</button>
    </form>
  );
}

export default CourseEnrollment;