import React from "react";
import { BrowserRouter as Router, Link, Routes, Route,  } from "react-router-dom";
import './App.css'
import Login from './login/login';
import Dashboard from "./Dashboard/Dashboard";

function App() {

  return (
    <Router>
      <div>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Dashboard />} />
      </Routes>
    </div>
    </Router>
    
  );
}

export default App
