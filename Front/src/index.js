import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Courses from './Courses';
import Login from './Login';
import Enrollement from './Enrollement';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" exact element={<Courses/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/enrollement" element={<Enrollement/>} />      
    </Routes>
  </Router>  
);  

ReactDOM.render(<App />, document.getElementById('root'));