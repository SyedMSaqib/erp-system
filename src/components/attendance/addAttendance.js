import React, { useContext, useEffect, useState } from 'react';
import EmployeeContext from '../../context/employees/employeeContext';
import AttendanceContext from "../../context/attendance/attendanceContext";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AddAttendance = () => {
  const { employees, getAllEmployees } = useContext(EmployeeContext);
  const { addAttendance,date,formatDate} = useContext(AttendanceContext);
  const Navigate=useNavigate()
  const Date=formatDate(date)

  useEffect(() => {
    getAllEmployees();
  }, []);

  const [attendanceData, setAttendanceData] = useState([]);

  const handleCheckboxChange = (employee) => {
    
    const employeeExists = attendanceData.some((record) => record._id === employee._id);

    if (!employeeExists) {
      
      setAttendanceData([...attendanceData, { _id: employee._id, name: employee.name }]);
    } else {
      
      setAttendanceData(attendanceData.filter((record) => record._id !== employee._id));
    }
  };
 
  const handleSaveAttendance = async () => {
    
    attendanceData.map((employeeAttendance)=>{
         addAttendance(
          employeeAttendance._id,
          employeeAttendance.name,
          true,
          Date
        )
        
       
    })
    employees.map((emp)=>{
      const employeeExists = attendanceData.some((record) => record._id === emp._id);
      if (!employeeExists)
      {
        addAttendance(
          emp._id,
          emp.name,
          false,
          Date  
        )
      }
    })
    Navigate('/addAttendanceDate')
    toast.success(<span>Attendance Added for :<span className='font-bold'>{Date}</span></span>)
}
//
  return (
    <div className="flex justify-center items-center w-screen sm:ml-48 lg:ml-0 dark:bg-gray-900 " >
    <div>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 ml-72 dark:border-gray-600">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50 dark:bg-gray-950 ">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-300">
                No
              </th>
              <th scope="col" className="px-20 py-4 font-medium text-gray-900 dark:text-gray-300">
                Employee Name
              </th>
              <th scope="col" className="px-20 py-4 font-medium text-gray-900 dark:text-gray-300">
                Attendance
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100 dark:divide-gray-600 dark:border-gray-600">
            {employees.map((employee, index) => (
              <tr className="hover:bg-gray-50 dark:bg-gray-950" key={index}>
                <td className="flex gap-3 px-6 py-4 font-normal text-gray-900 dark:text-gray-400">
                  {index + 1}
                </td>
                <td className="px-20 py-4 dark:text-gray-400">{employee.name}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={attendanceData.some((record) => record._id === employee._id)}
                    onChange={() => handleCheckboxChange(employee)}
                    className="w-4 h-4 ml-24 text-slate-400 bg-gray-100 border-gray-300 rounded focus:ring-slate-400 dark:focus:ring-slate-400 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="ml-40">
        <button
          className="ml-96 p-2 pl-5 pr-5 bg-transparent border-2 border-slate-400 text-indigo-500 text-lg rounded-lg transition-colors duration-700 transform hover:bg-slate-400 hover:text-gray-100 focus:border-4 focus:border-indigo-300"
          onClick={ handleSaveAttendance}  
        >
          Select
        </button>
      </div>
    </div>
    </div>
  );
};

export default AddAttendance;
