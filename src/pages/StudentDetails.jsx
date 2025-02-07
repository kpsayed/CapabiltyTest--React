import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudentNationality,
  fetchNationalities,
  updateStudentNationality,
} from "../redux/studentSlice";
import { Link } from "react-router-dom";

const StudentDetails = ({ goToHome }) => {

  const { id } = useParams();
  const dispatch = useDispatch();

  const student = useSelector((state) => state.student.student);
  const nationalities = useSelector((state) => state.student.nationalities);
  console.log(nationalities);
  const [selectedNationality, setSelectedNationality] = useState("");

  useEffect(() => {
    dispatch(fetchStudentNationality(id));
    dispatch(fetchNationalities());
  }, [dispatch, id]);

  useEffect(() => {
    if (student) {
      setSelectedNationality(student.nationalityId);
    }
  }, [student]);

  const handleNationalityChange = (event) => {
    setSelectedNationality(event.target.value);
  };

  const handleUpdateNationality = () => {
    dispatch(updateStudentNationality({ studentId: id, nationalityId: selectedNationality }));
  };

  if (!student) return <p>Loading student details...</p>;

  return (
    <div>
      <h1>Student Details</h1>


     <Link to={`/students/${id}/edit`}>
      <button>Edit Basic Details</button>
    </Link>

      <p>First Name: {student.firstName}</p>
      <p>Last Name: {student.lastName}</p>
      <label>Change Nationality:</label>
  
               <select value={selectedNationality} onChange={handleNationalityChange}>


{nationalities && nationalities.length > 0 ? (
 
nationalities.map((nation) => (
<option key={nation.id} value={nation.id}> {nation.name}</option> 
))) : (<option disabled>Loading Nationalities...</option>)}



</select>
        







      <button onClick={handleUpdateNationality}>Update Nationality</button>
      <br/>

      <button onClick={goToHome} style={{ background: "blue", color: "white" }}>Home</button>
 
      
    </div>

  );
};

export default StudentDetails;
