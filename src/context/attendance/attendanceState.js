import React, {  useState } from 'react';
import AttendanceContext from './attendanceContext';
import config from '../../config';

const AttendanceState = (props) => {
  const host=config.apiurl
  const initialAttendanceData = [];
  const authToken = localStorage.getItem('authToken');

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
    const response = await fetch(`${host}/Attendance/fetchAllAttendance`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken,
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
    setAttendance( [newAttendance]);

    // Add attendance record API call
    const response = await fetch(`${host}/attendance/addAttendance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':authToken,
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
        'auth-token': authToken,
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
        'auth-token': authToken,
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
