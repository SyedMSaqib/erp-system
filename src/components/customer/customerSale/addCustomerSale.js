import React, { useContext, useState } from 'react'
import customerSaleContext from "../../../context/customerSaleContext";
import { useNavigate } from 'react-router-dom';
const AddCustomerSale = () => {
    
    const Navigate = useNavigate();
    const {addCustomerSale}=useContext(customerSaleContext)
    const [customerSale, setcustomerSale] = useState({customerId:"",product:"",quantity:""})
    
    const handleChange=(e)=>{
       setcustomerSale({...customerSale,[e.target.name]:e.target.value})
      }
      
      const onClick=(event)=>{
        event.preventDefault();
        addCustomerSale(customerSale.customerId,customerSale.product,customerSale.quantity)
        Navigate('/viewCustomerSale')    
    
      }
  return (
    <div className="shadow-xl w-full lg:ml-96 mr-52 my-20 md:ml-96 mr-52 my-20 sm:ml-96 mr-52 my-20  ">
    <div className="pl-8 py-8 px-8  pr-8">
      <div>
        <h1 class="mb-1 font-bold text-3xl flex gap-1 items-baseline font-mono">
          Add Customer Sale<span class="text-sm text-gray-400">SAS ERP</span>
        </h1>
        <div class="grid max-w-3xl gap-5 py-10 px-8 sm:grid-cols-1 bg-white rounded-md border-t-4 border-gray-400">
          <div class="grid">
            <div class="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
              <input
                type="text"
                name="quantity"
              
                class="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                placeholder="Quantity" onChange={handleChange}
              />
              <label
                html="quantity"
                class="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
              >
                Quantity
              </label>
            </div>
          </div>
         
          <div class="grid">
            <div class="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
              <input
                type="text"
                name="customerId"
                
                class="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                placeholder="Customer Id" onChange={handleChange}
              />
              <label
                html="company"
                class="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
              >
                Customer Id
              </label>
            </div>
          </div>
          <div class="grid">
            <div class="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
              <input
                
                name="product"
                
                class="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                placeholder="Product" onChange={handleChange}
              />
              <label
                html="Product"
                class="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
              >
                Product
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
  )
}

export default AddCustomerSale