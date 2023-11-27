import React, { useContext, useState, useEffect } from 'react';
import EmployeeContext from '../../context/employees/employeeContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import validator from 'validator';

const UpdateEmployee = () => {
  const navigate = useNavigate();
  const employeeContext = useContext(EmployeeContext);
  const { updateEmployee, employeeId, updateFormValues } = employeeContext;
  const [employee, setEmployee] = useState(updateFormValues);
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);
  const [payValid, setpayValid] = useState(false)

  const NameValidator = (str) => {
    return /^[A-Za-z\s]+$/.test(str);
  };

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

    if (employee.name === '' || employee.email === '' || employee.phone === ''|| employee.basePay==='') {
      return toast.error('Please Enter All Fields');
    }

    if (NameValidator(employee.name)) {
      setNameValid(true);
    } else {
      toast.error('Enter Valid Name');
      setNameValid(false);
    }

    if (validator.isEmail(employee.email)) {
      setEmailValid(true);
    } else {
      toast.error('Enter Valid Email');
      setEmailValid(false);
    }

    if (validator.isNumeric(employee.phone)) {
      setPhoneValid(true);
    } else {
      toast.error('Enter Valid Phone Number');
      setPhoneValid(false);
    }
     const basePayAsString = employee.basePay.toString(); //because validator is checking only strings, ah not "ABC" like, meaning string "123" and "ABC" also lol, this is a string.....you got it i know
  if (validator.isNumeric(basePayAsString)) {
      setpayValid(true);
    } else {
      toast.error("Enter Valid Pay");
      setpayValid(false);
    }
  };

  useEffect(() => {
    if (nameValid && emailValid && phoneValid && payValid) {
      if (employee !== null) {
        updateEmployee(employeeId, employee.name, employee.email, employee.phone, employee.basePay);
        navigate('/viewEmployee');
      }
    }
  }, [nameValid, emailValid, phoneValid, payValid]);

  return (
    <div className='lg:flex lg:justify-center lg:content-center sm:ml-64'>
    <div className="shadow-xl md:w-[30rem] sm:w-[20rem] mb-5 lg:mt-10 mx-auto  border dark:bg-gray-950 bg-slate-50 border-gray-300 rounded-xl dark:border-gray-600">
      <div className="pl-8 py-8 px-8 pr-8">
        <div className="">
        <div className="bg-slate-50 dark:bg-gray-950 dark:text-gray-400 ">
            <h1 className="mb-1 font-bold pr-24 text-3xl flex gap-1 items-baseline font-mono">
              Update Employee<span className="text-sm text-gray-400">SAS ERP</span>
            </h1>
            <div className="grid max-w-3xl lg:gap-8 sm:gap-3 py-10 px-8 sm:grid-cols-1 dark:bg-gray-950 bg-slate-50 rounded-md border-t-4 border-gray-400">
            <div className="grid">
            <div  className="bg-white dark:bg-gray-900 flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700">
                      <input
                        className="peer dark:bg-gray-900 block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0 dark:text-gray-300"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    value={employee.name || ''}
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
              <div  className="bg-white dark:bg-gray-900 flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700">
                      <input
                        className="peer dark:bg-gray-900 block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0 dark:text-gray-300"
                  name="basePay"
                  placeholder="Base Pay/ Day"
                  onChange={handleChange}
                  value={employee.basePay || ''}
                />
                <label
                  htmlFor="basePay"
                  className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                >
                  BasePay/Day
                </label>
              </div>
            </div>

              <div className="grid">
              <div  className="bg-white dark:bg-gray-900 flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700">
                      <input
                        className="peer dark:bg-gray-900 block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0 dark:text-gray-300"
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    onChange={handleChange}
                    value={employee.phone || ''}
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
              <div  className="bg-white dark:bg-gray-900 flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700">
                      <input
                        className="peer dark:bg-gray-900 block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0 dark:text-gray-300"
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={employee.email || ''}
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

export default UpdateEmployee;
