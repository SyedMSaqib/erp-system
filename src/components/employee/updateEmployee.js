import React, { useContext, useState, useEffect } from 'react';
import EmployeeContext from '../../context/employees/employeeContext';
import { useNavigate } from 'react-router-dom';

const UpdateEmployee = () => {
  const navigate = useNavigate();
  const employeeContext = useContext(EmployeeContext);
  const { updateEmployee, employeeId, updateFormValues } = employeeContext;
  const [employee, setEmployee] = useState(updateFormValues);

  useEffect(() => {
    if (updateFormValues) {
      setEmployee(updateFormValues);
    }
  }, [updateFormValues]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const onClick = (event) => {
    event.preventDefault();
    if (employee !== null) {
      updateEmployee(employeeId, employee.name, employee.email, employee.phone);
      navigate('/viewEmployee');
    }
  };

  return (
    <div className="shadow-xl w-full lg:ml-96 mr-52 my-20 md:ml-96 mr-52 my-20 sm:ml-96 mr-52 my-20">
      <div className="lg:pl-20 border-2 rounded-lg pr-28 md:pl-20 pr-28 sm:pl-20 pr-28">
        <h1 className="font-semibold py-8">Update Employee</h1>
        <form className="pt-10">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder=""
                name="name"
                onChange={handleChange}
                value={employee.name || ''}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder=""
                name="email"
                onChange={handleChange}
                value={employee.email || ''}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                Phone
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder=""
                name="phone"
                onChange={handleChange}
                value={employee.phone || ''}
              />
              <div className="lg:ml-48 pl-11 sm:ml-96 md:ml-36">
                <button
                  onClick={onClick}
                  className="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group"
                >
                  <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                  <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                  <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                  <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                  <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                  <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">Submit</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployee;
