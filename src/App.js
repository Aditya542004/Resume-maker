// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes


import Home from "./components/Home";
import Templates from "./components/Templates";
import Login from "./components/Login";
import About from "./components/About";
import Navbar from "./components/Navbar";


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
      
        <Routes> {/* Use Routes instead of Route */}
          <Route path="/" element={<Home/>} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/about" element={<About/>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
