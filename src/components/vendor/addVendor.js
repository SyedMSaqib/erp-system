import React, { useContext, useState, useEffect } from "react";
import VendorContext from "../../context/vendor/vendorContext";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import validator from 'validator';

const AddVendor = () => {
  const [NameValid, setNameValid] = useState(false);
  const [EmailValid, setEmailValid] = useState(false);
  const Navigate = useNavigate();
  const vendorContext = useContext(VendorContext);
  const { addVendor } = vendorContext;
  const [Vendor, setVendor] = useState({ Name: "", email: "" });

  const NameValidator = (str) => {
    return /^[A-Za-z\s]+$/.test(str);
  }

  const onClick = (event) => {
    event.preventDefault();

    if (Vendor.Name === "" || Vendor.email === "") {
      return toast.error("Please Enter All Fields",document.documentElement.classList.contains('dark')? {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }:"");
    }

    if (NameValidator(Vendor.Name)) {
      setNameValid(true);
    } else {
      toast.error("Enter Valid Name",document.documentElement.classList.contains('dark')? {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }:"");
      setNameValid(false);
    }

    if (validator.isEmail(Vendor.email)) {
      setEmailValid(true);
    } else {
      toast.error("Enter Valid Email Address",document.documentElement.classList.contains('dark')? {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }:"");
      setEmailValid(false);
    }
  }

  useEffect(() => {
    if (NameValid && EmailValid) {
      AddVendorToDb();
    }
  }, [NameValid, EmailValid]);

  const AddVendorToDb = () => {
    addVendor(Vendor.Name, Vendor.email);
    toast.success(`${Vendor.Name} added as a vendor`,document.documentElement.classList.contains('dark')? {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    }:"");
    Navigate('/viewVendors');
  }

  const handleChange = (e) => {
    setVendor({ ...Vendor, [e.target.name]: e.target.value });
  }

  return (
    <div className='lg:flex lg:justify-center lg:content-center sm:ml-64'>
      <div className="shadow-xl md:w-[30rem] sm:w-[20rem] mb-5 lg:mt-10 mx-auto  border dark:bg-gray-950 bg-slate-50 dark:border-gray-600 border-gray-300 rounded-xl">
        <div className="pl-8 py-8 px-8  pr-8">
          <div className="">
            <div className="bg-slate-50 dark:bg-gray-950">
              <h1 className="mb-1 font-bold pr-24 text-3xl flex gap-1 items-baseline font-mono dark:text-gray-300">
                Add Vendor<span className="text-sm text-gray-400 dark:text-gray-300">SAS ERP</span>
              </h1>
              <div className="grid max-w-3xl lg:gap-8 sm:gap-3 py-10 px-8 sm:grid-cols-1 bg-slate-50 rounded-md border-t-4 border-gray-600 dark:bg-gray-950">
                <div className="grid">
                <div  className="bg-white dark:bg-gray-900 flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700">
                      <input
                        className="peer dark:bg-gray-900 block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0 dark:text-gray-300"
                      type="text"
                      name="Name"
                      placeholder="Name" onChange={handleChange}
                    />
                    <label
                      html="Name"
                      className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                    >
                      Name
                    </label>
                  </div>
                </div>
                <div className="grid">
                <div  className="bg-white dark:bg-gray-900 flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700">
                      <input
                        className="peer dark:bg-gray-900 block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0 dark:text-gray-300"
                      type="text"
                      name="email"
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
  );
}

export default AddVendor;
