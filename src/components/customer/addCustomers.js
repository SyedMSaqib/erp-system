import React, { useContext, useState, useEffect } from "react";
import CustomerContext from "../../context/customer/customerContext";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import validator from 'validator';

const AddCustomers = () => {
  const [NameValid, setNameValid] = useState(false);
  const [PhNoValid, setPhNoValid] = useState(false);
  const [EmailValid, setEmailValid] = useState(false);
  const Navigate = useNavigate();
  const customerContext = useContext(CustomerContext);
  const { addCustomer } = customerContext;
  const [Customer, setCustomer] = useState({ name: "", email: "", phone: "" });

  const NameValidator = (str) => {
    return /^[A-Za-z\s]+$/.test(str);
  }

  const onClick = (event) => {
    event.preventDefault();

    if (Customer.name === "" || Customer.phone === "" || Customer.email === "") {
      return toast.error("Please Enter All Fields");
    }

    if (NameValidator(Customer.name)) {
      setNameValid(true);
    } else {
      toast.error("Enter Valid Name");
      setNameValid(false);
    }

    if (validator.isNumeric(Customer.phone)) {
      setPhNoValid(true);
    } else {
      toast.error("Enter Valid Phone Number");
      setPhNoValid(false);
    }

    if (validator.isEmail(Customer.email)) {
      setEmailValid(true);
    } else {
      toast.error("Enter Valid Email Address");
      setEmailValid(false);
    }
  }

  useEffect(() => {
    if (NameValid && PhNoValid && EmailValid) {
      AddCustomerToDb();
    }
  }, [NameValid, PhNoValid, EmailValid]);

  const AddCustomerToDb = () => {
    addCustomer(Customer.name, Customer.phone, Customer.email);
    toast.success(`${Customer.name} added as a customer`);
    Navigate('/viewCustomers');
  }

  const handleChange = (e) => {
    setCustomer({ ...Customer, [e.target.name]: e.target.value });
  }
  return (
    <div className='lg:flex lg:justify-center lg:content-center sm:ml-64'>
    <div className="shadow-xl md:w-[30rem] sm:w-[20rem] mb-5 lg:mt-10 mx-auto  border dark:bg-gray-950 bg-slate-50 dark:border-gray-600 border-gray-300 rounded-xl">
    <div className="pl-8 py-8 px-8  pr-8">
      <div className="">
        <div className="bg-slate-50 dark:bg-gray-950">
          <h1 className="mb-1 font-bold pr-24 text-3xl flex gap-1 items-baseline font-mono dark:text-gray-300">
            Add Customer<span className="text-sm text-gray-400 dark:text-gray-300">SAS ERP</span>
          </h1>
          <div className="grid max-w-3xl lg:gap-8 sm:gap-3 py-10 px-8 sm:grid-cols-1 bg-slate-50 rounded-md border-t-4 border-gray-600 dark:bg-gray-950">
            <div className="grid">
              <div className="bg-white flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 ">
                <input
                  type="text"
                  name="name"
                
                  className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                  placeholder="Name" onChange={handleChange}
                />
                <label
                  html="name"
                  className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
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
                  placeholder="Phone" onChange={handleChange}
                />
                <label
                  html="company"
                  className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                >
                  Phone No
                </label>
              </div>
            </div>
            <div className="grid">
            <div className="bg-white flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 ">
                <input
                  
                  name="email"
                  
                  className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                  placeholder="E-mail" onChange={handleChange}
                />
                <label
                  html="email"
                  className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                >
                  E-mail
                </label>
              </div>
            </div>
            <button onClick={onClick} type="submit" className="mt-4 bg-slate-400 text-white  py-2 px-6 rounded-md hover:bg-slate-500 ">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}

export default AddCustomers
