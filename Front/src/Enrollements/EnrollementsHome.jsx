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
    getEnrollements();
  }, []);

  const addEnrollement = (enrollement) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enrollement),
    };

    fetch("http://localhost:3000/api/enrollements", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
    setEnrollements([...enrollements, enrollement]);
  };

  const deleteEnrollement = (id) => {
    fetch(`http://localhost:3000/api/enrollements/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        getEnrollements();
      })
      .catch((err) => alert(err));
  };

  const updateEnrollement = (index, course) => {
    // fetch(`http://localhost:3000/api/courses/${id}`, {
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
    <>
      <h1>Enrollements</h1>
      <EnrollementsList
        enrollements={enrollements}
        deleteEnrollement={deleteEnrollement}
        updateEnrollement={updateEnrollement}
      ></EnrollementsList>
      <CreateEnrollment addEnrollement={addEnrollement}></CreateEnrollment>
    </>
  );
}

export default EnrollementsHome;
