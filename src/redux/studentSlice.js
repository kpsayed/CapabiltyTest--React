import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://localhost:7059/v1/api"; 

export const fetchStudents = createAsyncThunk("students/fetchAll", async () => {
  const response = await axios.get(`${API_URL}/Students`);
  return response.data;
  
});

export const addStudent = createAsyncThunk("students/add", async (student) => {
  const response = await axios.post(`${API_URL}/Students`, student);

  return response.data;
});


// Fetch a student's nationality
export const fetchStudentNationality = createAsyncThunk(
    "students/fetchNationality",
    async (id) => {
      const response = await axios.get(`/api/Students/${id}/Nationality`);
      return response.data;
    }
  );
  
  // Fetch all nationalities
  export const fetchNationalities = createAsyncThunk(
    "students/fetchNationalities",
    async () => {
      const response = await axios.get("/api/Nationalities");
      return response.data;
    }
  );
  
  // Update a student's nationality
  export const updateStudentNationality = createAsyncThunk(
    "students/updateNationality",
    async ({ studentId, nationalityId }) => {
      const response = await axios.put(`/api/Students/${studentId}/Nationality/${nationalityId}`);
      return response.data;
    }
  );

const studentSlice = createSlice({
  name: "students",
  initialState: { students: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      });
  },
});

export default studentSlice.reducer;
