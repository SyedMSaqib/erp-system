import React, { useContext, useState } from 'react';
import attendanceContext from '../../context/attendance/attendanceContext';
import { useNavigate } from 'react-router-dom';
import Datepicker from "react-tailwindcss-datepicker";


const AddAttendanceDate = () => {
  const { setdate, } = useContext(attendanceContext);
  const [value, setValue] = useState({
    startDate: null,
    endDate: null
  });

  const Navigate = useNavigate();

  const handleValueChange = (newValue) => {
    setValue(newValue);
    if(value.startDate){
    setdate(value.startDate);
    Navigate('/addAttendance');
    
    }
  };

  

  return (
    <div className="flex  h-screen  w-screen">
      <div className="pl-96 ml-60   "> {/* Adjust the width as needed */}
        <Datepicker
          primaryColor={"indigo"}
          showShortcuts={true}
          theme={"light"}
          value={value}
          onChange={handleValueChange}
          
        />
      </div>
    </div>
  );
};

export default AddAttendanceDate;
