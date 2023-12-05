import React, { useContext, useEffect, useState } from "react"
import ProductContext from "../../context/product/productContext"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import validator from "validator"
import SelectData from "../customer/customerSale/icons/selectData"
import SetVendor from "./VendorModals/setVendor"
import VendorContext from "../../context/vendor/vendorContext"

const AddProduct = () => {
  const NameValidator = (str) => {
    return /^[A-Za-z\s]+$/.test(str)
  }
  useEffect(() => {
  
    document.title = 'Inventory-SAS ERP';


    return () => {
      document.title = 'SAS ERP';
    };
  }, []);

  const navigate = useNavigate()
  const productContext = useContext(ProductContext)
  const { addProduct } = productContext
  const { vendorModelData, setVendorModelData, setIsVisible } = useContext(VendorContext)

  const [isValidName, setIsValidName] = useState(false)
  const [isValidPrice, setIsValidPrice] = useState(false)
  const [isValidQuantity, setIsValidQuantity] = useState(false)
  const [name, setname] = useState("")
  const [category, setcategory] = useState("")
  const [vendor, setVendor] = useState("")
  const [vendorPrice, setvendorPrice] = useState("")
  const [price, setprice] = useState("")
  const [quantity, setquantity] = useState("")
  const [description, setdescription] = useState("")
  const [vendorId, setvendorId] = useState("")
  const [paymentStatus, setpaymentStatus] = useState(false)

  useEffect(() => {
    setIsVisible(false)

    if (vendorModelData.name) {
      setVendor(vendorModelData.name)
    }

    if (vendorModelData._id) {
      setvendorId(vendorModelData._id)
    }
  }, [vendorModelData])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "name") setname(value)
    if (name === "category") setcategory(value)
    if (name === "price") setprice(value)
    if (name === "vendorPrice") setvendorPrice(value)
    if (name === "quantity") setquantity(value)
    if (name === "description") setdescription(value)
  }

  const onClick = (Paystatus) => {
    setpaymentStatus(Paystatus)

    if (
      name === "" || category === "" ||vendorId === "" || vendorPrice === "" || price === "" ||quantity==="" ||  description === "") {
      return toast.error("Please Enter All Fields",document.documentElement.classList.contains('dark')? {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }:"");
    }

    if (NameValidator(name)) {
      setIsValidName(true)
    } else {
      toast.error("Enter Valid Name",document.documentElement.classList.contains('dark')? {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }:"");
      setIsValidName(false)
    }

    if (validator.isNumeric(quantity)&& quantity>0) {
      setIsValidQuantity(true)
    } else {
      toast.error("Enter Valid Quantity",document.documentElement.classList.contains('dark')? {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }:"");
      setIsValidQuantity(false)
    }

    if (validator.isNumeric(price) && price > 0) {
      setIsValidPrice(true)
    } else {
      toast.error("Enter Valid Price",document.documentElement.classList.contains('dark')? {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }:"");
      setIsValidPrice(false)
    }
    if (validator.isNumeric(vendorPrice) && vendorPrice > 0) {
      setIsValidPrice(true)
    } else {
      toast.error("Enter Valid vendor price Price",document.documentElement.classList.contains('dark')? {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }:"");
      setIsValidPrice(false)
    }

 
  }

  useEffect(() => {
    if (isValidName && isValidQuantity && isValidPrice && vendor) {
      if(paymentStatus)
      addProduct(name, description, category, quantity, price, vendor, vendorPrice, vendorId,paymentStatus)
    else
    addProduct(name, description, category, quantity, price, vendor, vendorPrice, vendorId,paymentStatus)
      toast.success(`${name} added to Inventory`,document.documentElement.classList.contains('dark')? {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }:"");
      navigate("/viewProduct")
      setVendorModelData({})
    }
  }, [isValidName, isValidQuantity, isValidPrice, addProduct])

  const onClickVendor = () => {
    setIsVisible(true)
  }

  return (
    <>
      <SetVendor />
      <div className='lg:flex lg:justify-center lg:content-center sm:ml-64 dark:bg-gray-900 bg-slate-50 '>
    <div className="shadow-xl md:w-[27rem] lg:mt-10 sm:w-[20rem] mb-5  mx-auto  border dark:text-gray-300 dark:bg-gray-950 bg-slate-50 border-gray-300 dark:border-gray-600 rounded-xl">
        <div className="pl-8 py-8 px-8 pr-8">
          <div>
            <h1 className="mb-1 font-bold text-3xl flex gap-1 items-baseline font-mono">
              Add Product<span className="text-sm text-gray-400">SAS ERP</span>
            </h1>
            <div className="grid  lg:gap-8 sm:gap-3 py-10 px-8 sm:grid-cols-1 bg-slate-50 rounded-md dark:bg-gray-950 border-t-4 border-gray-400">
            <div className="flex flex-row ">
              <div  className="w-72">

              <div  className="bg-white dark:bg-gray-900 flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700">
                      <input
                        className="peer dark:bg-gray-900 block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0 dark:text-gray-300"
                        name="name"
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
                  </div>

                  <div className="flex flex-row ">
              <div  className="w-72">

              <div  className="bg-white dark:bg-gray-900 flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700">
                      <input
                        className="peer dark:bg-gray-900 block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0 dark:text-gray-300"
                        type="text"
                        name="category"
                        placeholder="Category"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="category"
                        className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                      >
                        Category
                      </label>
                    </div>
                  </div>
                  </div>

                  <div className="flex flex-row ">
                    <div className="w-72">
                      <div  className="bg-white dark:bg-gray-900 flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700">
                      <input
                        className="peer dark:bg-gray-900 block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0 dark:text-gray-300"
                          name="vendor"
                          placeholder="Vendor"
                          onChange={handleChange}
                          value={vendor}
                          disabled={true}
                        />
                        <label
                          html="vendor"
                          className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                        >
                          Vendor
                        </label>
                      </div>
                    </div>
                    <div onClick={() => onClickVendor()} className=" text-sm text-gray-500">
                      <div className="w-5 pt-2  cursor-pointer">
                        <SelectData />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row ">
              <div  className="w-72">

              <div  className="bg-white dark:bg-gray-900 flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700">
                      <input
                        className="peer dark:bg-gray-900 block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0 dark:text-gray-300"
                        type="text"
                        name="vendorPrice"
                        placeholder="Vendor Price"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="price"
                        className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                      >
                        VendorPrice
                      </label>
                    </div>
                  </div>
                  </div>

                  <div className="flex flex-row ">
              <div  className="w-72">

              <div  className="bg-white dark:bg-gray-900 flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700">
                      <input
                        className="peer dark:bg-gray-900 block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0 dark:text-gray-300"
                        type="text"
                        name="price"
                        placeholder="Price"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="price"
                        className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                      >
                        Price
                      </label>
                    </div>
                  </div>
                  </div>

                  {/* Quantity Input */}
                  <div className="flex flex-row ">
              <div  className="w-72">

              <div  className="bg-white dark:bg-gray-900 flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700">
                      <input
                        className="peer dark:bg-gray-900 block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0 dark:text-gray-300"
                        type="text"
                        name="quantity"
                        placeholder="Quantity"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="quantity"
                        className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                      >
                        Quantity
                      </label>
                    </div>
                  </div>
                  </div>

                  {/* Description Input */}
                  <div className="flex flex-row ">
              <div  className="w-72">

              <div  className="bg-white dark:bg-gray-900 flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700">
                      <input
                        className="peer dark:bg-gray-900 block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0 dark:text-gray-300"
                        type="text"
                        name="description"
                        placeholder="Description"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="description"
                        className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                      >
                        Description
                      </label>
                    </div>
                  </div>
                  </div>

                  <div className="flex justify-center space-x-10">  
  <button
  onClick={()=>onClick(true)}
    type="button"
    className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-green-400 hover:text-green-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-green-500 w-[8rem]"
  >
    On Cash
  </button>
  <button
  onClick={()=>onClick(false)}
    type="button"
    className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-green-400 hover:text-green-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-green-500 w-[8rem]"
  >
    On Credit
  </button>
</div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddProduct
