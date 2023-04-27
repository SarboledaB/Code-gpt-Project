const connection = require('./dbconfig');

class Student {
  constructor(studentID, firstName, lastName, email, password) {
    this.studentID = studentID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  static getAll(callback) {
    const query = 'SELECT * FROM students';
    connection.query(query, (err, rows) => {
      if (err) throw err;

      const students = rows.map((row) => new Student(row.studentID, row.firstName, row.lastName, row.email, row.password));
      callback(students);
    });
  }

  static getById(id, callback) {
    const query = 'SELECT * FROM students WHERE studentID = ?';
    connection.query(query, [id], (err, rows) => {
      if (err) throw err;

      if (rows.length === 0) {
        callback(null);
        return;
      }

      const student = new Student(rows[0].studentID, rows[0].firstName, rows[0].lastName, rows[0].email, rows[0].password);
      callback(student);
    });
  }

  static add(student, callback) {
    const query = 'INSERT INTO students (firstName, lastName, email, password) VALUES (?, ?, ?, ?)';
    connection.query(query, [student.firstName, student.lastName, student.email, student.password], (err, result) => {
      if (err) throw err;

      student.studentID = result.insertId;
      callback(student);
    });
  }
}

class Course {
  constructor(courseID, courseName, description, instructor, startTime, endTime, location) {
    this.courseID = courseID;
    this.courseName = courseName;
    this.description = description;
    this.instructor = instructor;
    this.startTime = startTime;
    this.endTime = endTime;
    this.location = location;
  }

  static getAll(callback) {
    const query = 'SELECT * FROM courses';
    connection.query(query, (err, rows) => {
      if (err) throw err;

      const courses = rows.map((row) => new Course(row.courseID, row.courseName, row.description, row.instructor, row.startTime, row.endTime, row.location));
      callback(courses);
    });
  }

  static getById(id, callback) {
    const query = 'SELECT * FROM courses WHERE courseID = ?';
    connection.query(query, [id], (err, rows) => {
      if (err) throw err;

      if (rows.length === 0) {
        callback(null);
        return;
      }

      const course = new Course(rows[0].courseID, rows[0].courseName, rows[0].description, rows[0].instructor, rows[0].startTime, rows[0].endTime, rows[0].location);
      callback(course);
    });
  }

  static add(course, callback) {
    const query = 'INSERT INTO courses (courseName, description, instructor, startTime, endTime, location) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [course.courseName, course.description, course.instructor, course.startTime, course.endTime, course.location], (err, result) => {
      if (err) throw err;

      course.courseID = result.insertId;
      callback(course);
    });
  }
}

class Enrollment {
    constructor(enrollmentID, student, course, enrollmentDate) {
      this.enrollmentID = enrollmentID;
      this.student = student;
      this.course = course;
      this.enrollmentDate = enrollmentDate;
    }
  
    static getAll(callback) {
      const query = 'SELECT * FROM enrollments';
      connection.query(query, (err, rows) => {
        if (err) throw err;
  
        const enrollments = rows.map((row) => new Enrollment(row.enrollmentID, new Student(row.studentID), new Course(row.courseID), row.enrollmentDate));
        callback(enrollments);
      });
    }
  
    static getById(id, callback) {
      const query = 'SELECT * FROM enrollments WHERE enrollmentID = ?';
      connection.query(query, [id], (err, rows) => {
        if (err) throw err;
  
        if (rows.length === 0) {
          callback(null);
          return;
        }
  
        const enrollment = new Enrollment(rows[0].enrollmentID, new Student(rows[0].studentID), new Course(rows[0].courseID), rows[0].enrollmentDate);
        callback(enrollment);
      });
    }
  
    static add(enrollment, callback) {
      const query = 'INSERT INTO enrollments (studentID, courseID, enrollmentDate) VALUES (?, ?, ?)';
      connection.query(query, [enrollment.student.studentID, enrollment.course.courseID, enrollment.enrollmentDate], (err, result) => {
        if (err) throw err;
  
        enrollment.enrollmentID = result.insertId;
        callback(enrollment);
      });
    }
  }
  
  module.exports = {
    Student,
    Course,
    Enrollment
  };