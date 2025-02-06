import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import AddStudent from "./pages/AddStudent";
import StudentDetails from "./pages/StudentDetails";
import EditStudent from "./pages/EditStudent"; 
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/student/:id" element={<StudentDetails />} />


        <Route path="/students/:id/edit" element={<EditStudent />} />

      </Routes>
    </Router>
  );
};

export default App;
