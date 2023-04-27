const connection = require('./dbconfig');

class Student {
    constructor(studentID, firstName, lastName, email, password) {
        this.studentID = studentID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}

class Course {
    constructor(courseID, courseName, description, instructor, startTime, endTime, location) {
        this.courseID = courseID;
        this.courseName = courseName;
        this.description = description;
        this.instructor = instructor,
        this.startTime = startTime;
        this.endTime = endTime;
        this.location = location;
    }
}

class Enrollment {
    constructor(enrollmentID, student, course, enrollmentDate) {
        this.enrollmentID = enrollmentID;
        this.student = student;
        this.course = course;
        this.enrollmentDate = enrollmentDate;
    }
}

class Prerequisite {
    constructor(prerequisiteID, course, prerequisiteCourse) {
        this.prerequisiteID = prerequisiteID;
        this.course = course;
        this.prerequisiteCourse = prerequisiteCourse;
    }
}

module.exports = {
    Student,
    Course,
    Enrollment,
    Prerequisite
};
