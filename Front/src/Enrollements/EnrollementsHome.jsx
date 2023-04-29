import React, { useEffect, useState } from "react";
import EnrollementsList from "./EnrollementsList";
import CreateEnrollment from "./CreateEnrollement";

function EnrollementsHome() {
  const [enrollements, setEnrollements] = useState([]);

  const getEnrollements = () => {
    fetch("http://localhost:3000/api/enrollements")
      .then((response) => response.json())
      .then((data) => setEnrollements(data)) // not check yet!
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    // getEnrollements();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // alert(`Course Name: ${courseName}, Student Name: ${studentName}`);
  };

  return (
    <>
      <h1>Enrollements</h1>
      <EnrollementsList
        enrollements={enrollements}
        // deleteEnrollement={deleteCourse}
        // updateCourse={updateCourse}
      ></EnrollementsList>
      <CreateEnrollment></CreateEnrollment>
      {/* <CourseForm submit={addCourse}></CourseForm> */}
    </>
  );
}

export default EnrollementsHome;
