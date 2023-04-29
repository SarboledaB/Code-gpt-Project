const express = require('express');
const router = express.Router();
const { Student, Course, Enrollment, Prerequisite } = require('./models');
const connection = require('./dbconfig');
const { query } = require('express');

// API endpoints

// Get all students
router.get('/students', (req, res) => {
    const query = 'SELECT * FROM students';
    connection.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Get student by ID
router.get('/students/:id', (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM students WHERE studentID = ${id}`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        res.send(result[0]);
    });
});

// Create student
router.post('/students', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const student = new Student(null, firstName, lastName, email, password);
    const query = `INSERT INTO students (firstName, lastName, email, password) VALUES ('${student.firstName}', '${student.lastName}', '${student.email}', '${student.password}')`;
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
    const query = `UPDATE students SET firstName = '${firstName}', lastName = '${lastName}', email = '${email}', password = '${password}' WHERE studentID = ${id}`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        const updatedStudent = new Student(id, firstName, lastName, email, password);
        res.send(updatedStudent);
    });
});


// Delete student by ID
router.delete('/students/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM students WHERE studentID = ${id}`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        res.send(`Student with ID ${id} deleted`);
    });
});

// Get all courses
router.get('/courses', (req, res) => {
    const query = 'SELECT * FROM courses';
    connection.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Get course by ID
router.get('/courses/:id', (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM courses WHERE courseID = ${id}`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        res.send(result[0]);
    });
});

// Create course
router.post('/courses', (req, res) => {
    const { courseName, description, instructor, startTime, endTime, location } = req.body;
    const course = new Course(null, courseName, description, instructor, startTime, endTime, location);
    const query = `INSERT INTO courses (courseName, description, instructor, startTime, endTime, location) VALUES ('${course.courseName}', '${course.description}', '${course.instructor}', '${course.startTime}', '${course.endTime}', '${course.location}')`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        course.courseID = result.insertId;
        res.send(course);
    });
});

// Update course by ID
router.put('/courses/:id', (req, res) => {
    const { id } = req.params;
    const { courseName, description, instructor, startTime, endTime, location } = req.body;
    const query = `UPDATE courses SET courseName = '${courseName}', description = '${description}', instructor = '${instructor}', startTime = '${startTime}', endTime = '${endTime}', location = '${location}' WHERE courseID = ${id}`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        const updatedCourse = new Course(id, courseName, description, instructor, startTime, endTime, location);
        res.send(updatedCourse);
    });
});

// Delete course by ID
router.delete('/courses/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM courses WHERE courseID = ${id}`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        res.send(`Course with ID ${id} deleted`);
    });
});

// CREATE enrollment
router.post('/enrollments', (req, res) => {
    const { studentID, courseID } = req.body;
    const enrollment = new Enrollment(null, new Student(studentID), new Course(courseID), new Date());
    const query = `INSERT INTO enrollments (studentID, courseID, enrollmentDate) VALUES ('${enrollment.student.studentID}', '${enrollment.course.courseID}', '${enrollment.enrollmentDate.toISOString()}')`;
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
    const query = `SELECT * FROM enrollments`;
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
    const query = `UPDATE enrollments SET studentID='${enrollment.student.studentID}', courseID='${enrollment.course.courseID}', enrollmentDate='${enrollment.enrollmentDate.toISOString()}' WHERE enrollmentID=${enrollmentID}`;
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
    const query = `DELETE FROM enrollments WHERE enrollmentID=${enrollmentID}`;
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
    const query = `SELECT * FROM students WHERE email = '${email}' AND password = '${password}'`;
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
    const query = `INSERT INTO prerequisites (courseID, prerequisiteCourseID) VALUES ('${prerequisite.course.courseID}', '${prerequisite.prerequisiteCourse.courseID}')`;
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
    const query = `SELECT * FROM prerequisites`;
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
    const query = `UPDATE prerequisites SET courseID='${prerequisite.course.courseID}', prerequisiteCourseID='${prerequisite.prerequisiteCourse.courseID}' WHERE prerequisiteID=${prerequisiteID}`;
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
    const query = `DELETE FROM prerequisites WHERE prerequisiteID=${prerequisiteID}`;
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
