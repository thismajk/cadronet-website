import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/Home"; 
import Register from "./components/Register";
import Login from "./components/Login";
import Board from "./components/Board";
import Availability from './components/Availability';
import Schedule from './components/Schedule';
import CreateSchedule from './components/CreateSchedule';
import Settings from './components/Settings';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/App" element={<Board />} />
        <Route path="/App/Availability" element={<Availability />} />
        <Route path="/App/Schedule" element={<Schedule />} />
        <Route path="/App/Settings" element={<Settings />} />
        <Route path="/App/Schedule/Create-Schedule" element={<CreateSchedule />} />
      </Routes>
    </Router>
  );
}
export default App;
