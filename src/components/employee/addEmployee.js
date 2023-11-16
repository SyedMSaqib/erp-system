import React, { useContext, useState, useEffect } from "react";
import EmployeeContext from "../../context/employees/employeeContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import validator from "validator";

const AddEmployees = () => {
  const navigate = useNavigate();
  const employeeContext = useContext(EmployeeContext);
  const { addEmployee } = employeeContext;
  const [employee, setEmployee] = useState({ name: "", email: "", phone: "" });
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);

  const NameValidator = (str) => {
    return /^[A-Za-z\s]+$/.test(str);
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const onClick = (event) => {
    event.preventDefault();

    if (employee.name === "" || employee.email === "" || employee.phone === "") {
      return toast.error("Please Enter All Fields");
    }

    if (NameValidator(employee.name)) {
      setNameValid(true);
    } else {
      toast.error("Enter Valid Name");
      setNameValid(false);
    }

    if (validator.isEmail(employee.email)) {
      setEmailValid(true);
    } else {
      toast.error("Enter Valid Email");
      setEmailValid(false);
    }

    if (validator.isNumeric(employee.phone)) {
      setPhoneValid(true);
    } else {
      toast.error("Enter Valid Phone Number");
      setPhoneValid(false);
    }
  };

  useEffect(() => {
    if (nameValid && emailValid && phoneValid) {
      addEmployee(employee.name, employee.email, employee.phone);
      navigate("/viewEmployee");
    }
  }, [nameValid, emailValid, phoneValid]);

  return (
    <div className='lg:flex lg:justify-center lg:content-center sm:ml-64'>
    <div className="shadow-xl md:w-[30rem] sm:w-[20rem] mb-5 lg:mt-10 mx-auto  border bg-slate-50 border-gray-300 rounded-xl">
    <div className="pl-8 py-8 px-8  pr-8">
      <div className="">
        <div className="bg-slate-50 ">
          <h1 className="mb-1 font-bold pr-24 text-3xl flex gap-1 items-baseline font-mono">
            Add Employee<span className="text-sm text-gray-400">SAS ERP</span>
          </h1>
          <div className="grid max-w-3xl lg:gap-8 sm:gap-3 py-10 px-8 sm:grid-cols-1 bg-slate-50 rounded-md border-t-4 border-gray-400">
            <div className="grid">
              <div className="bg-white flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 ">
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
            <div className="bg-white flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 ">
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
            <div className="bg-white flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 ">
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

            <button
              onClick={onClick}
              type="submit"
              className="mt-4 bg-slate-400 text-white py-2 px-6 rounded-md hover:bg-slate-500"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default AddEmployees;
