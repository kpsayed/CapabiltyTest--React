import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://localhost:7059/v1/api"; 

export const fetchToken = createAsyncThunk("auth/fetchToken", async (role) => {
  const response = await axios.post("/get-token", { role });
  return response.data.token;
});


export const fetchStudents = createAsyncThunk("students/fetchAll", async () => {
  const response = await axios.get(`${API_URL}/Students`);
  return response.data;
  
});

export const addStudent = createAsyncThunk("students/add", async (student) => {
  const response = await axios.post(`${API_URL}/Students`, student);

  return response.data;
});


  
  export const fetchStudentNationality = createAsyncThunk(
    "students/fetchNationality",
    async (id) => {
      const response = await axios.get(`${API_URL}/Students/${id}/Nationality`);
      return response.data;
    }
  );

  export const fetchNationalities = createAsyncThunk(
    "students/fetchNationalities",
    async () => {
      const response = await axios.get(`${API_URL}/Nationalities`);
      return response.data;
    }
  );
  

  export const updateStudentNationality = createAsyncThunk(
    "students/updateNationality",
    async ({ studentId, nationalityId }) => {
      const response = await axios.put(`${API_URL}/Students/${studentId}/Nationality/${nationalityId}`);
      return response.data;
    }
  );





  export const updateStudent = createAsyncThunk(
    "students/update",
    async (student) => {
      console.log("API Call:", student);
      const response = await axios.put(`${API_URL}/Students/${student.id}`, student);
      console.log("API Response:", response.data);
      return response.data;
    }
  );
  
  

const studentSlice = createSlice({
  name: "students",
  initialState: { students: [], 
    role: localStorage.getItem("role") || "Admin",
    token: localStorage.getItem("token") || null,
    status: "idle", error: null },
  // reducers: {},
  reducers: {
    setRole: (state, action) => {
        state.role = action.payload;
        localStorage.setItem("role", action.payload);
    },
    logout: (state) => {
      state.role = null;
      state.token = null;
      localStorage.removeItem("role");
      localStorage.removeItem("token");
    }
},
  extraReducers: (builder) => {
    builder

    .addCase(fetchToken.fulfilled, (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    })



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
      })


      .addCase(fetchStudentNationality.fulfilled, (state, action) => {
        state.student = action.payload;
      })
      .addCase(fetchNationalities.fulfilled, (state, action) => {
        state.nationalities = action.payload;
      })
      .addCase(updateStudentNationality.fulfilled, (state, action) => {
        if (state.student) {
          state.student.nationalityId = action.payload.nationalityId;
        }
      })





      .addCase(updateStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.students.findIndex(s => s.id === action.payload.id);
        if (index !== -1) state.students[index] = action.payload;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });


  },
});

export const { setRole, logout } = studentSlice.actions;
export default studentSlice.reducer;
