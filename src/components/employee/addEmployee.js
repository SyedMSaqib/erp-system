import React, { useContext, useState } from "react";
import EmployeeContext from "../../context/employeeContext";
import { useNavigate } from "react-router-dom";

const AddEmployees = () => {
  const navigate = useNavigate();
  const employeeContext = useContext(EmployeeContext);
  const { addEmployee } = employeeContext;
  const [employee, setEmployee] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const onClick = (event) => {
    event.preventDefault();
    addEmployee(employee.name, employee.email, employee.phone);
    navigate('/viewEmployee');
  };

  return (
    <div className="shadow-xl w-full lg:ml-96 mr-52 my-20 md:ml-96 mr-52 my-20 sm:ml-96 mr-52 my-20">
      <div className="pl-8 py-8 px-8  pr-8">
        <div>
          <h1 className="mb-1 font-bold text-3xl flex gap-1 items-baseline font-mono">
            Add Employee<span className="text-sm text-gray-400">SAS ERP</span>
          </h1>
          <div className="grid max-w-3xl gap-5 py-10 px-8 sm:grid-cols-1 bg-white rounded-md border-t-4 border-gray-400">
            <div className="grid">
              <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                <input
                  
                  name="name"
                  className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                  placeholder="Name"
                  onChange={handleChange}
                />
                <label
                  htmlFor="name"
                  className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                >
                  Name
                </label>
              </div>
            </div>


            <div className="grid">
              <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                <input
                  type="text"
                  name="phone"
                  className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                  placeholder="Phone"
                  onChange={handleChange}
                />
                <label
                  htmlFor="company"
                  className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                >
                  Phone No
                </label>
              </div>
            </div>


            <div className="grid">
              <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                <input
                  type="text"
                  name="email"
                  className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                  placeholder="Email"
                  onChange={handleChange}
                />
                <label
                  htmlFor="email"
                  className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                >
                  E-mail
                </label>
              </div>
            </div>

            
            <button onClick={onClick} type="submit" className="mt-4 bg-slate-400 text-white py-2 px-6 rounded-md hover:bg-slate-500">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployees;
