import React from "react"
import { useContext, useEffect, useState } from "react"
import EmployeeContext from "./../../context/employees/employeeContext"
import RolesContext from "../../context/roles/rolesContext"

const Employees = () => {
  const { employees, getAllEmployees } = useContext(EmployeeContext)
  const { isVisible, setisVisible, setroleData} = useContext(RolesContext)

  const onClickEmployee = (emp_data) => {
    setroleData(emp_data)
    setisVisible(false)
  }

  useEffect(() => {
    getAllEmployees()
  }, [])
  if (isVisible)
    return (
      <div className=" min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none ">
        <div
          onClick={() => {
            setisVisible(false)
          }}
          className=" backdrop-blur-sm bg-black bg-opacity-20 w-full h-full absolute"
        ></div>
        <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg dark:bg-gray-950 bg-white z-50  h-4/5 overflow-y-auto  ">
          <div className="">
            <div class="p-3  text-center space-x-4 md:block">
              <table className="w-full border-collapse dark:border-gray-600 bg-white text-left text-sm text-gray-500 dark:bg-gray-950 dark:text-gray-400">
                <thead className="bg-gray-50 dark:bg-gray-950 dark:text-gray-300">
                  <tr>
                    <th
                      scope="col"
                      className="lg:px-6 sm:px-2 lg:py-4 sm:py-2 sm:w-5 font-medium text-gray-900 dark:text-gray-300"
                    >
                      Name
                    </th>

                    <th
                      scope="col"
                      className="lg:px-12 lg:py-4 font-medium text-gray-900 dark:text-gray-300"
                    >
                      Email
                    </th>

                    <th
                      scope="col"
                      className=" lg:py-4 font-medium text-gray-900 dark:text-gray-300"
                    ></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-600 border-t border-gray-100 dark:border-gray-600">
                  {employees.map((employees) => (
                    <tr
                      onClick={() => onClickEmployee(employees)}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                      key={employees._id}
                    >
                      <td className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <div className="text-sm">
                          <div className="font-medium text-gray-700 dark:text-gray-400">
                            {employees.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-12 py-4">{employees.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Employees
