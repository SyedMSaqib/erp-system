import React, { useContext, useState } from 'react';
import attendanceContext from '../../context/attendance/attendanceContext';
import { useNavigate } from 'react-router-dom';



const AttendanceDatePicker = () => {
    const {setdate}=useContext(attendanceContext)
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  setdate(selectedDate)
  
  
  const Navigate=useNavigate()
  const onClick=()=>{
    Navigate('/viewAttendance')
  }

  return (
    <div className="ml-48 my-10">
      <div className='ml-44'>
        <h1 class="pl-96 mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-4xl">
          Enter <mark class="px-2 text-white bg-blue-600 rounded dark:bg-slate-400">Date</mark> 
        </h1>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 align-middle ml-96  shadow-md m-5 px-48 py-36">
        <div className="relative max-w-sm ">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            ></svg>
          </div>
          <input
            type="date" // Use type="date" for date picker
            value={selectedDate}
            onChange={handleDateChange}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 placeholder-gray-400 focus:placeholder-gray-600"
            placeholder="Select date"
          />
        </div>

        <div onClick={onClick} class="text-center py-10">
          <button class="p-2 pl-5 pr-5 bg-transparent border-2 border-slate-400 text-indigo-500 text-lg rounded-lg transition-colors duration-700 transform hover:bg-slate-400 hover:text-gray-100 focus:border-4 focus:border-indigo-300">
            Select
          </button>
        </div>
      </div>
    </div>
  )
};

export default AttendanceDatePicker;
