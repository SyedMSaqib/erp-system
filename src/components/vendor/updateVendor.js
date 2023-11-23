import React, { useContext, useState, useEffect } from 'react';
import VendorContext from '../../context/vendor/vendorContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import validator from 'validator';

const UpdateVendor = () => {
  const navigate = useNavigate();
  const vendorContext = useContext(VendorContext);
  const { updateVendor, vendorId, updateFormValues } = vendorContext;
  const [vendor, setVendor] = useState(updateFormValues);
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  useEffect(() => {
    if (updateFormValues) {
      setVendor(updateFormValues);
    }
  }, [updateFormValues]);

  const nameValidator = (str) => {
    return /^[A-Za-z\s]+$/.test(str);
  };

  const onClick = (event) => {
    event.preventDefault();

    if (vendor.name === '' || vendor.email === '') {
      return toast.error('Please Enter All Fields');
    }

    if (nameValidator(vendor.name)) {
      setNameValid(true);
    } else {
      toast.error('Enter Valid Name');
      setNameValid(false);
    }

    if (validator.isEmail(vendor.email)) {
      setEmailValid(true);
    } else {
      toast.error('Enter Valid Email Address');
      setEmailValid(false);
    }
  };

  useEffect(() => {
    if (nameValid && emailValid) {
        console.log(vendor)
      updateVendor(vendorId, vendor.name, vendor.email);
      navigate('/viewVendors');
    }
  }, [nameValid, emailValid]);

  const handleChange = (e) => {
    setVendor({ ...vendor, [e.target.name]: e.target.value });
  };

  return (
    <div className='lg:flex lg:justify-center lg:content-center sm:ml-64'>
    <div className="shadow-xl md:w-[30rem] sm:w-[20rem] mb-5 lg:mt-2  mx-auto  border bg-slate-50 border-gray-300 rounded-xl">
      <div className="pl-8 py-8 px-8 pr-8">
        <div className="">
          <div className="bg-slate-50">
            <h1 className="mb-1 font-bold pr-24 text-3xl flex gap-1 items-baseline font-mono">
              Update Vendor<span className="text-sm text-gray-400">SAS ERP</span>
            </h1>
            <div className="grid max-w-3xl lg:gap-8 sm:gap-3 py-10 px-8 sm:grid-cols-1 bg-slate-50 rounded-md border-t-4 border-gray-400">
              {/* Name Input */}
              <div className="grid">
                <div className="bg-white flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2">
                  <input
                    name="name"
                    className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                    placeholder="Name"
                    onChange={handleChange}
                    value={vendor.name || ''}
                  />
                  <label
                    htmlFor="Name"
                    className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                  >
                    Name
                  </label>
                </div>
              </div>

              <div className="grid">
                <div className="bg-white flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2">
                  <input
                    type="text"
                    name="email"
                    className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                    placeholder="Email"
                    onChange={handleChange}
                    value={vendor.email || ''}
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

export default UpdateVendor;
