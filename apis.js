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
// Add course
router.post('/courses', (req, res) => {
    const { name, description, credits } = req.body;
    const query = `INSERT INTO courses (name, description, credits) VALUES ('${name}', '${description}', ${credits})`;
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
    const query = `UPDATE courses SET name = '${name}', description = '${description}', credits = ${credits} WHERE courseID = ${id}`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        const updatedCourse = { courseID: id, name, description, credits };
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


module.exports = router;
