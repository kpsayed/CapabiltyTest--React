import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudentNationality,
  fetchNationalities,
  updateStudentNationality,
} from "../redux/studentSlice";

const StudentDetails = () => {
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
      <p>First Name: {student.firstName}</p>
      <p>Last Name: {student.lastName}</p>
      {/* <p>Current Nationality: {student.nationalityId}</p> */}
      <label>Change Nationality:</label>
      <select value={selectedNationality} onChange={handleNationalityChange}>
      {console.log('selectedNationality:', selectedNationality)}
      {console.log('nationalities:', nationalities)}

      {nationalities && nationalities.length > 0 ? (
       
      nationalities.map((nation) => (
      <option key={nation.id} value={nation.id}> {nation.name}</option> 
      ))) : (<option disabled>Loading Nationalities...</option>)}
    
  
</select>




      <button onClick={handleUpdateNationality}>Update Nationality</button>
    </div>
  );
};

export default StudentDetails;
