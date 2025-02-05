import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../redux/studentSlice";

const StudentDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const student = students.find((s) => s.ID.toString() === id);

  if (!student) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Student Details</h1>
      <p>First Name: {student.firstName}</p>
      <p>Last Name: {student.lastName}</p>
      <p>Date of Birth: {new Date(student.dateOfBirth).toLocaleDateString()}</p>
    </div>
  );
};

export default StudentDetails;
