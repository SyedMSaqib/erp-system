import React, { useContext, useState } from 'react';
import attendanceContext from '../../context/attendance/attendanceContext';
import { useNavigate } from 'react-router-dom';
import Datepicker from "react-tailwindcss-datepicker";



const AttendanceDatePicker = () => {
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
    Navigate('/viewAttendance');
    
    }
  };

  // const onClickSet=()=>{
  //   setValue(newValue);
  //   if(value.startDate){
  //   setdate(value.startDate);
  //   Navigate('/viewAttendance');
  // }}

  return (
    <div className="flex  h-screen  w-screen">
      <div className="pl-96 ml-60   "> 
        <Datepicker
          primaryColor={"indigo"}
          showShortcuts={true}
          theme={"light"}
          value={value}
          onChange={handleValueChange}
          
        />
      </div>
      
  {/* <button onClick={()=>{onClickSet()}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-9">
    Set
  </button> */}
    </div>
  );
};
export default AttendanceDatePicker;
