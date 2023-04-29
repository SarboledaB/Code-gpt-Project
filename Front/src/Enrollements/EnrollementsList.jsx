import React from "react";

const EnrollementsList = (props) => {
  return (
    <div>
      <h2>Enrollements List</h2>
      <table>
        <thead>
          <tr>
            <th>EnrollmentID</th>
            <th>StudentID</th>
            <th>CourseID</th>
            <th>EnrollmentDate</th>
          </tr>
        </thead>

        {props.enrollements.map((enrollement) => (
          <tbody key={enrollement.EnrollmentID}>
            <tr>
              <td>{enrollement.EnrollmentID}</td>
              <td>{enrollement.StudentID}</td>
              <td>{enrollement.CourseID}</td>
              <td>{enrollement.EnrollmentDate}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};
export default EnrollementsList;
