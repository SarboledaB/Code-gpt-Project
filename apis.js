const express = require('express');
const router = express.Router();
const { Student, Course, Enrollment, Prerequisite } = require('./models');
const connection = require('./dbconfig');
const { query } = require('express');

// API endpoints

// Get all students
router.get('/students', (req, res) => {
    const query = 'SELECT * FROM Student';
    connection.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Get student by ID
router.get('/students/:id', (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM Student WHERE studentID = ${id}`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        res.send(result[0]);
    });
});

// Create student
router.post('/students', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const student = new Student(null, firstName, lastName, email, password);
    const query = `INSERT INTO Student (firstName, lastName, email, password) VALUES ('${student.firstName}', '${student.lastName}', '${student.email}', '${student.password}')`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        student.studentID = result.insertId;
        res.send(student);
    });
});

// Update student by ID
router.put('/students/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, password } = req.body;
    const query = `UPDATE Student SET firstName = '${firstName}', lastName = '${lastName}', email = '${email}', password = '${password}' WHERE studentID = ${id}`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        const updatedStudent = new Student(id, firstName, lastName, email, password);
        res.send(updatedStudent);
    });
});


// Delete student by ID
router.delete('/students/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Student WHERE studentID = ${id}`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        res.send(`Student with ID ${id} deleted`);
    });
});


// Get all courses
router.get('/courses', (req, res) => {
    const query = 'SELECT * FROM Course';
    connection.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Get course by ID
router.get('/courses/:id', (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM Course WHERE courseID = ${id}`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        res.send(result[0]);
    });
});
// Add course
router.post('/courses', (req, res) => {
    const { name, description, credits } = req.body;
    const query = `INSERT INTO Course (name, description, credits) VALUES ('${name}', '${description}', ${credits})`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        const newCourse = { courseID: result.insertId, name, description, credits };
        res.send(newCourse);
    });
});
// Update course by ID
router.put('/courses/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, credits } = req.body;
    const query = `UPDATE Course SET name = '${name}', description = '${description}', credits = ${credits} WHERE courseID = ${id}`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        const updatedCourse = { courseID: id, name, description, credits };
        res.send(updatedCourse);
    });
});
// Delete course by ID
router.delete('/courses/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Course WHERE courseID = ${id}`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        res.send(`Course with ID ${id} deleted`);
    });
});

// CREATE enrollment
router.post('/enrollments', (req, res) => {
    const { studentID, courseID } = req.body;
    const enrollment = new Enrollment(null, new Student(studentID), new Course(courseID), new Date());
    const query = `INSERT INTO Enrollment (studentID, courseID, enrollmentDate) VALUES ('${enrollment.student.studentID}', '${enrollment.course.courseID}', '${enrollment.enrollmentDate.toISOString()}')`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        if (result.affectedRows === 0) {
            res.status(400).send('Enrollment failed');
        } else {
            enrollment.enrollmentID = result.insertId;
            res.send(enrollment);
        }
    });
});

// READ enrollments
router.get('/enrollments', (req, res) => {
    const query = `SELECT * FROM Enrollment`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        const enrollments = result.map(row => new Enrollment(
            row.enrollmentID,
            new Student(row.studentID, row.firstName, row.lastName, row.email, row.password),
            new Course(row.courseID, row.courseName, row.description, row.instructor, row.startTime, row.endTime, row.location),
            row.enrollmentDate
        ));
        res.send(enrollments);
    });
});

// UPDATE enrollment
router.put('/enrollments/:enrollmentID', (req, res) => {
    const { studentID, courseID } = req.body;
    const enrollmentID = req.params.enrollmentID;
    const enrollment = new Enrollment(enrollmentID, new Student(studentID), new Course(courseID), new Date());
    const query = `UPDATE Enrollment SET studentID='${enrollment.student.studentID}', courseID='${enrollment.course.courseID}', enrollmentDate='${enrollment.enrollmentDate.toISOString()}' WHERE enrollmentID=${enrollmentID}`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        if (result.affectedRows === 0) {
            res.status(400).send('Enrollment not found');
        } else {
            res.send(enrollment);
        }
    });
});

// DELETE enrollment
router.delete('/enrollments/:enrollmentID', (req, res) => {
    const enrollmentID = req.params.enrollmentID;
    const query = `DELETE FROM Enrollment WHERE enrollmentID=${enrollmentID}`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        if (result.affectedRows === 0) {
            res.status(400).send('Enrollment not found');
        } else {
            res.send(`Enrollment ${enrollmentID} has been deleted`);
        }
    });
});


// Login student
router.post('/students/login', (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT * FROM Student WHERE email = '${email}' AND password = '${password}'`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            res.status(401).send('Invalid credentials');
        } else {
            const student = new Student(result[0].studentID, result[0].firstName, result[0].lastName, result[0].email, result[0].password);
            res.send(student);
        }
    });
});

// CREATE prerequisite
router.post('/prerequisites', (req, res) => {
    const { courseID, prerequisiteCourseID } = req.body;
    const prerequisite = new Prerequisite(null, new Course(courseID), new Course(prerequisiteCourseID));
    const query = `INSERT INTO Prerequisite (courseID, prerequisiteCourseID) VALUES ('${prerequisite.course.courseID}', '${prerequisite.prerequisiteCourse.courseID}')`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        if (result.affectedRows === 0) {
            res.status(400).send('Prerequisite creation failed');
        } else {
            prerequisite.prerequisiteID = result.insertId;
            res.send(prerequisite);
        }
    });
});


// READ prerequisites
router.get('/prerequisites', (req, res) => {
    const query = `SELECT * FROM Prerequisite`;
        connection.query(query, (err, result) => {
                if (err) throw err;
                const prerequisites = result.map(row => new Prerequisite(
                    row.prerequisiteID,
                    new Course(row.courseID, row.courseName, row.description, row.instructor, row.startTime, row.endTime, row.location),
                    new Course(row.prerequisiteCourseID, row.prerequisiteCourseName, row.prerequisiteCourseDescription, row.prerequisiteCourseInstructor, row.prerequisiteCourseStartTime, row.prerequisiteCourseEndTime, row.prerequisiteCourseLocation)
        ));
        res.send(prerequisites);
    });
});


// UPDATE prerequisite
router.put('/prerequisites/:prerequisiteID', (req, res) => {
    const { courseID, prerequisiteCourseID } = req.body;
    const prerequisiteID = req.params.prerequisiteID;
    const prerequisite = new Prerequisite(prerequisiteID, new Course(courseID), new Course(prerequisiteCourseID));
    const query = `UPDATE Prerequisite SET courseID='${prerequisite.course.courseID}', prerequisiteCourseID='${prerequisite.prerequisiteCourse.courseID}' WHERE prerequisiteID=${prerequisiteID}`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        if (result.affectedRows === 0) {
            res.status(400).send('Prerequisite not found');
        } else {
            res.send(prerequisite);
        }
    });
});


// DELETE prerequisite
router.delete('/prerequisites/:prerequisiteID', (req, res) => {
    const prerequisiteID = req.params.prerequisiteID;
    const query = `DELETE FROM Prerequisite WHERE prerequisiteID=${prerequisiteID}`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        if (result.affectedRows === 0) {
            res.status(400).send('Prerequisite not found');
        } else {
            res.send(`Prerequisite ${prerequisiteID} has been deleted`);
        }
    });
});


module.exports = router;
