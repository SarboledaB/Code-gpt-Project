import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CoursesHome from './Courses/CoursesHome';
// import Login from './Login';
import EnrollementsHome from './Enrollements/EnrollementsHome';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" exact element={<CoursesHome/>} />
      <Route path="/courses" element={<CoursesHome/>} />
      <Route path="/enrollements" element={<EnrollementsHome/>} />      
      {/* <Route path="/login" element={<Login/>} /> */}
    </Routes>
  </Router>  
);  

ReactDOM.render(<App />, document.getElementById('root'));