import React, { useContext, useState } from 'react';
import attendanceContext from '../../context/attendance/attendanceContext';
import { useNavigate } from 'react-router-dom';
import Datepicker from "react-tailwindcss-datepicker";
import ViewAttendance from './charts/ViewAttendace';



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
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <div className="flex items-center justify-center w-[10rem] ml-[10rem]">
        <Datepicker
          primaryColor={"indigo"}
          showShortcuts={true}
          theme={"light"}
          value={value}
          onChange={handleValueChange}
        />
      </div>

      <div className="flex items-center justify-center w-full ml-[10rem]">
        <ViewAttendance />
      </div>
    </div>
  );
};
export default AttendanceDatePicker;
