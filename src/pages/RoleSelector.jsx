import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchToken, setRole, logout } from "../redux/studentSlice";

const RoleSelector = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.students.role);
  const token = useSelector((state) => state.students.token);

  const [selectedRole, setSelectedRole] = useState(role || "Admin");

  const handleRoleChange = (event) => {
    const newRole = event.target.value;
    setSelectedRole(newRole);
    dispatch(setRole(newRole)); 
    dispatch(fetchToken(newRole)); // Fetch JWT token
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h3>Select Role</h3>
      <select value={selectedRole} onChange={handleRoleChange}>
        <option value="Admin">Admin</option>
        <option value="Registrar">Registrar</option>
      </select>

      <p>Current Role: {role}</p>
      <p>JWT Token: {token ? "Token received" : "No token"}</p>

      {token && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
};

export default RoleSelector;
