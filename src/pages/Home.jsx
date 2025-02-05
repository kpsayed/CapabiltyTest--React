import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../redux/studentSlice";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students, status, error } = useSelector((state) => state.student);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStudents());
    }
  }, [status, dispatch]);
console.log(students);

  return (
    <div>
      <h1>Student Management</h1>
      <button onClick={() => navigate("/add-student")}>Add New Student</button>
      {status === "loading" && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>DOB</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={`${student.id}`}>
              <td>{`${student.id}`}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{new Date(student.dateOfBirth).toLocaleDateString()}</td>
              <td>
                <button onClick={() => navigate(`/student/${student.ID}`)}>
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
