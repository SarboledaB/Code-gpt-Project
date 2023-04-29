import React, { Component } from "react";

export default class CourseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseName: "",
      description: "",
      instructor: "",
      startTime: "",
      endTime: "",
      location: "",
    };

    this.handleChange = this.handleChange.bind(this); // bind the handleChange method to the component instance
    this.handleSubmit = this.handleSubmit.bind(this); // bind the handleSubmit method to the component instance
  }

  // handleChange method to update state when an input value changes
  handleChange(e) {
    // e is the event object passed in by React

    const name = e.target.name; // get the name of the input field from the event object

    const value = e.target.value; // get the value of the input field from the event object

    this.setState({ [name]: value }); // update state with new value
  }

  // handleSubmit method to submit form data and log it to console
  handleSubmit(e) {
    e.preventDefault(); // prevent default form submission behavior
    this.props.submit(this.state);
  }

  render() {
    return (
      <>
        <h1>Add course</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Course Name</label>
          <input type="text" name="courseName" onChange={this.handleChange} />
          <label>Description</label>
          <input type="text" name="description" onChange={this.handleChange} />
          <label>Instructor</label>
          <input type="text" name="instructor" onChange={this.handleChange} />
          <label>Start Time</label>
          <input type="time" name="startTime" onChange={this.handleChange} />
          <label>End Time</label>
          <input type="time" name="endTime" onChange={this.handleChange} />

          <input type="time" name="startTime" onChange={this.handleChange} />
          <label>Location</label>
          <input type="time" name="endTime" onChange={this.handleChange} />
          <button type="submit">Add Course</button>
        </form>
      </>
    );
  }
}
