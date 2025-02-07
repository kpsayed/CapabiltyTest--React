import React from "react";
import { Link } from "react-router-dom";
import RoleSelector from "../pages/RoleSelector";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div>
        <h2>Student Management</h2>
      </div>
      
      {/* Role Selector in Navbar */}
      <RoleSelector />

      <div>
        <Link to="/">Home</Link>
        <Link to="/add-student">Add Student</Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "white",
  }
};

export default Navbar;
