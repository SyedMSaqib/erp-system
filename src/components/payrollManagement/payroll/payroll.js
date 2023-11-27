import React, { useContext, useEffect } from "react"
import MonthDropdown from "../monthDropdown/monthDropdown"
import EmployeeContext from "../../../context/employees/employeeContext"
import SalaryContext from "../../../context/salary/salaryContext"
import toast from "react-hot-toast"

const Payroll = () => {
  const { employees, getAllEmployees } = useContext(EmployeeContext)
  const { addSalary, Days, setDays ,Month } = useContext(SalaryContext)
  
  const PaySalaries = async () => {
    try {
      const statusCode = await addSalary(Month, Days);
  
      if (statusCode === 400) {
        toast.error(`Salaries Already Paid for ${Month}`,document.documentElement.classList.contains('dark')? {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }:"");
      } else if (statusCode === 202) {
        setDays("");
        toast.success("Salaries Paid Successfully!");
      }
    } catch (error) {

      console.error("Error paying salaries:", error);
     
      toast.error("Error paying salaries. Please try again.");
    }
  };
   
 
  useEffect(() => {
    getAllEmployees()
  }, [])

  return (
    <div className="dark:bg-gray-900 bg-slate-50 ">
      <div className="flex justify-center items-center   ">
        <div className="rounded-lg flex justify-start border border-gray-300  dark:border-gray-700 shadow-md w-[60rem] h-[6rem] mt-9 ml-56 bg-gray-100 dark:bg-gray-950">
          <div className="pl-10 pt-4">
            <MonthDropdown />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center ">
        <div class="w-[60rem] ml-[14rem] overflow-x-auto mt-10 ">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:border-gray-700 dark:text-gray-400 border border-gray-300">
            <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3 ">
                  Employee Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Employee Id
                </th>
                <th scope="col" class="px-6 py-3">
                  Pay/day
                </th>
                <th scope="col" class="px-6  py-3">
                  Monthly Pay
                </th>
              </tr>
            </thead>
            <tbody>
              {Days && employees.map((employee) => (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {employee.name}
                  </th>
                  <td class="px-6 py-4 text-xs">{employee._id}</td>
                  <td class="px-6 py-4 ">Rs {employee.basePay}</td>
                  <td class="px-6 py-4 font-semibold">Rs {employee.basePay*Days}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       </div>
      {Days && <div className="flex justify-center content-center">
      <button onClick={()=>PaySalaries()} type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mt-6 ml-60">Pay Salaries</button>
      </div>}
    </div>
  )
}

export default Payroll
