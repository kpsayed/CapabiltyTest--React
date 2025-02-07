import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/Home";
import AddStudent from "./pages/AddStudent";
import StudentDetails from "./pages/StudentDetails";
import EditStudent from "./pages/EditStudent";



const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/add-student" element={<AddStudent goToHome={goToHome} />} />
      <Route path="/student/:id" element={<StudentDetails goToHome={goToHome} />} />
      <Route path="/students/:id/edit" element={<EditStudent goToHome={goToHome} />} />
    </Routes>
  );
};

export default App;
