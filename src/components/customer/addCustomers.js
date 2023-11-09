import React, { useContext, useState } from "react"
import CustomerContext from "../../context/customer/customerContext";
import { useNavigate } from "react-router-dom";



const AddCustomers = () => {
    const Navigate = useNavigate();
    const customerContext = useContext(CustomerContext);
    const{addCustomer}=customerContext
    const [Customer, setCustomer] = useState({name:"",email:"",phone:""})
    const handleChange=(e)=>{
        setCustomer({...Customer,[e.target.name]:e.target.value})
      }
      const onClick=(event)=>{
        event.preventDefault();
        addCustomer(Customer.name,Customer.phone,Customer.email)
        Navigate('/viewCustomers')
      }

  return (
    <div className="flex justify-center items-center w-screen h-screen" >
    <div className="shadow-xl  rounded-lg border border-gray-300 bg-gray-50 p-20 ">
      <div className="">
        <div className="bg-gray-50">
          <h1 class="mb-1 font-bold text-3xl flex gap-1 items-baseline font-mono">
            Add Customer<span class="text-sm text-gray-400">SAS ERP</span>
          </h1>
          <div class="grid  gap-5 w-96  sm:grid-cols-1 bg-gray-50 rounded-md border-t-4 border-gray-400">
            <div class="grid">
              <div class="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                <input
                  type="text"
                  name="name"
                
                  class="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                  placeholder="Name" onChange={handleChange}
                />
                <label
                  html="name"
                  class="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                >
                  Name
                </label>
              </div>
            </div>
           
            <div class="grid">
              <div class="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                <input
                  type="text"
                  name="phone"
                  
                  class="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                  placeholder="Phone" onChange={handleChange}
                />
                <label
                  html="company"
                  class="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                >
                  Phone No
                </label>
              </div>
            </div>
            <div class="grid">
              <div class="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                <input
                  
                  name="email"
                  
                  class="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                  placeholder="E-mail" onChange={handleChange}
                />
                <label
                  html="email"
                  class="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                >
                  E-mail
                </label>
              </div>
            </div>
            <button onClick={onClick} type="submit" class="mt-4 bg-slate-400 text-white  py-2 px-6 rounded-md hover:bg-slate-500 ">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AddCustomers
