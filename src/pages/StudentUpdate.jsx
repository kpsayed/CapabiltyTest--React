import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateStudentDetails, fetchStudentById } from "../redux/studentSlice";

const StudentUpdate = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const student = useSelector((state) => state.student.student);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  useEffect(() => {
    dispatch(fetchStudentById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (student) {
      setFirstName(student.firstName);
      setLastName(student.lastName);
      setDateOfBirth(student.dateOfBirth);
    }
  }, [student]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedStudent = {
      ID: id,
      firstName,
      lastName,
      dateOfBirth,
    };
    dispatch(updateStudentDetails(updatedStudent)).then(() => {
      history.push(`/students/${id}`);
    });
  };

  if (!student) return <p>Loading student details...</p>;

  return (
    <div>
      <h1>Update Student Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default StudentUpdate;
