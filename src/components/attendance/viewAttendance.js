import React, { useContext, useEffect } from "react";
import AttendanceContext from "../../context/attendance/attendanceContext";


const ViewAttendance = () => {
  const { attendance, getAllAttendance, deleteAttendance, date ,formatDate} = useContext(AttendanceContext);

  useEffect(() => {
    getAllAttendance();
  }, []);

  
 
  const formattedDate = formatDate(date);  

  const filteredAttendance = attendance.filter((attendance) => {
    console.log(new Date(attendance.date).toLocaleDateString() +"alocal")
    console.log(formattedDate)
    return new Date(attendance.date).toLocaleDateString() === formattedDate;
  });

  return (
    <div className="flex justify-center items-center dark:bg-gray-900  " >
      <div className="overflow-auto rounded-lg border border-gray-200 dark:border-gray-600 shadow-md m-5 ml-64">
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
              <th scope="col" className="px-20 py-4 font-medium text-gray-900 dark:text-gray-300">
                Date
              </th>
              {/* <th scope="col" className="px-20 py-4 font-medium text-gray-900 dark:text-gray-300"></th> */}
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-100 dark:divide-gray-600 border-t border-gray-100 dark:border-gray-600">
            {filteredAttendance.map((attendance,index) => (
                
              <tr className={`transition-colors ${index % 2 === 0 ? 'bg-white dark:bg-gray-950' : 'bg-gray-50 dark:bg-gray-950'} hover:bg-gray-100 hover:dark:bg-gray-800 `}  key={attendance._id}>
                <td className="px-6 py-4">
                  {index+1}
                </td>
                <td className="flex gap-3 px-20 py-4 font-normal text-gray-900">
                  <div className="text-sm">
                    <div className="font-medium text-gray-700">{attendance.name}</div>
                  </div>
                </td>
                <td className="px-20 py-4">
                  <span className={`inline-flex items-center gap-1 w-16  px-2 py-1 text-xs font-semibold ${attendance.attendance ? 'bg-green-50 dark:bg-green-50/5 text-green-600' : 'bg-red-50 dark:bg-red-50/5 text-red-600'}`}>
                    <span className={` ${attendance.attendance ? 'bg-green-600 dark:bg-green-600/5' : 'bg-red-600'}`}></span>
                    {attendance.attendance ? 'Present' : 'Absent'}
                  </span>
                </td>
                <td className="px-20 py-4">
                  {new Date(attendance.date).toLocaleDateString()}
                </td>
                {/* <td className="px-6 py-4">
                  <div className="flex justify-end gap-4">
                    <button
                      x-data="{ tooltip: 'Delete' }"
                      onClick={() => {
                        deleteAttendance(attendance._id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                        x-tooltip="tooltip"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAttendance;
