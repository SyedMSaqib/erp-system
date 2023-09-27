import React, {  useState } from 'react';
import AttendanceContext from './attendanceContext';

const AttendanceState = (props) => {
  const host = 'http://localhost:5000';
  const initialAttendanceData = [];

  const [attendance, setAttendance] = useState(initialAttendanceData);
  const [attendanceId, setAttendanceId] = useState(null);
  const [updateFormValues, setUpdateFormValues] = useState(null);
  const [date, setdate] = useState(null)


  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    
    
    
  
    return `${month}/${day}/${year}`;
  }

  const getAllAttendance = async () => {
    // Get attendance records API call
    const response = await fetch(`${host}/Attendance/fetchAllAttendance`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3ZTRlNTYyZThjNWNhZmRmZWY2MzdmIn0sImlhdCI6MTY4NTk5OTE5MH0.tANfZWBhWrVuSXEhNvIAutanlz2LpwO0ZaJrDfN3cj0',
      },
    });
    const data = await response.json();
    setAttendance(data);
  };

  const addAttendance = async (employeeId, name, attendance,date) => {
    const newAttendance = {
      employeeId,
      name,
      attendance,
      date
    };
    setAttendance( newAttendance);

    // Add attendance record API call
    const response = await fetch(`${host}/attendance/addAttendance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3ZTRlNTYyZThjNWNhZmRmZWY2MzdmIn0sImlhdCI6MTY4NTk5OTE5MH0.tANfZWBhWrVuSXEhNvIAutanlz2LpwO0ZaJrDfN3cj0',
      },
      body: JSON.stringify({ employeeId, name, attendance,date }),
    });
  };

  const updateAttendance = async (id, employeeId, name, attendance) => {
    // Update attendance record API call
    const response = await fetch(`${host}/attendance/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3ZTRlNTYyZThjNWNhZmRmZWY2MzdmIn0sImlhdCI6MTY4NTk5OTE5MH0.tANfZWBhWrVuSXEhNvIAutanlz2LpwO0ZaJrDfN3cj0',
      },
      body: JSON.stringify({ employeeId, name, attendance }),
    });
  };

  const deleteAttendance = async (id) => {
    const updatedAttendance = attendance.filter((data) => data._id !== id);
    setAttendance(updatedAttendance);

    // Delete attendance record API call
    const response = await fetch(`${host}/attendance/deleteAttendance/${id}`, {
      method: 'DELETE',
      headers: {
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3ZTRlNTYyZThjNWNhZmRmZWY2MzdmIn0sImlhdCI6MTY4NTk5OTE5MH0.tANfZWBhWrVuSXEhNvIAutanlz2LpwO0ZaJrDfN3cj0',
      },
    });
  };

  return (
    <AttendanceContext.Provider
      value={{
        attendance,
        getAllAttendance,
        addAttendance,
        updateAttendance,
        deleteAttendance,
        attendanceId,
        updateFormValues,
        setUpdateFormValues,
        setAttendanceId,
        setdate,
        date,
        formatDate
      }}
    >
      {props.children}
    </AttendanceContext.Provider>
  );
};

export default AttendanceState;
