import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateStudent } from "../redux/studentSlice";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const student = useSelector((state) =>
    state.student.students.find((s) => s.id === parseInt(id))
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
  });

  useEffect(() => {
    if (!student) {
      dispatch(fetchStudents());
    } else {
      setFormData({
        firstName: student.firstName || "",
        lastName: student.lastName || "",
        dateOfBirth: student.dateOfBirth ? student.dateOfBirth.split("T")[0] : "",
      });
    }
  }, [student, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Dispatching updateStudent:", { id: parseInt(id), ...formData });
    dispatch(updateStudent({ id: parseInt(id), ...formData }));
    navigate(`/student/${id}`, { replace: true });
    window.location.reload();
  };

  if (!student) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </div>

        <div>
          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>

        <div>
          <label>Date of Birth:</label>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditStudent;
