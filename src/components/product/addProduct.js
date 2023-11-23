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

  const onClick = (event) => {
    event.preventDefault()
    console.log(vendor)
    if (
      name === "" || category === "" ||vendorId === "" || vendorPrice === "" || price === "" ||quantity==="" ||  description === "") {
      return toast.error("Please Enter All Fields")
    }

    if (NameValidator(name)) {
      setIsValidName(true)
    } else {
      toast.error("Enter Valid Name")
      setIsValidName(false)
    }

    if (validator.isNumeric(quantity)&& quantity>0) {
      setIsValidQuantity(true)
    } else {
      toast.error("Enter Valid Quantity")
      setIsValidQuantity(false)
    }

    if (validator.isNumeric(price) && price > 0) {
      setIsValidPrice(true)
    } else {
      toast.error("Enter Valid Price")
      setIsValidPrice(false)
    }
    if (validator.isNumeric(vendorPrice) && vendorPrice > 0) {
      setIsValidPrice(true)
    } else {
      toast.error("Enter Valid vendor price Price")
      setIsValidPrice(false)
    }

 
  }

  useEffect(() => {
    if (isValidName && isValidQuantity && isValidPrice && vendor) {
      addProduct(name, description, category, quantity, price, vendor, vendorPrice, vendorId)
      toast.success(`${name} added to Inventory`)
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
      <div className='lg:flex lg:justify-center lg:content-center sm:ml-64'>
    <div className="shadow-xl md:w-[27rem] lg:mt-10 sm:w-[20rem] mb-5  mx-auto  border dark:text-gray-300 dark:bg-gray-950 bg-slate-50 border-gray-300 dark:border-gray-600 rounded-xl">
        <div className="pl-8 py-8 px-8 pr-8">
          <div>
            <h1 className="mb-1 font-bold text-3xl flex gap-1 items-baseline font-mono">
              Add Customer Sale<span className="text-sm text-gray-400">SAS ERP</span>
            </h1>
            <div className="grid  lg:gap-8 sm:gap-3 py-10 px-8 sm:grid-cols-1 bg-slate-50 rounded-md dark:bg-gray-950 border-t-4 border-gray-400">
            <div className="flex flex-row ">
              <div  className="w-72">

              <div  className="bg-white flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 ">
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
                  </div>

                  <div className="flex flex-row ">
              <div  className="w-72">

              <div  className="bg-white flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 ">
                      <input
                        type="text"
                        name="category"
                        className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
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
                      <div className="bg-white flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 ">
                        <input
                          name="vendor"
                          className="peer block w-full border-0 p-0 text-base text-gray-400 placeholder-gray-400 focus:ring-0"
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

              <div  className="bg-white flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 ">
                      <input
                        type="text"
                        name="vendorPrice"
                        className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
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

              <div  className="bg-white flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 ">
                      <input
                        type="text"
                        name="price"
                        className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
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

              <div  className="bg-white flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 ">
                      <input
                        type="text"
                        name="quantity"
                        className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
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

              <div  className="bg-white flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 ">
                      <input
                        type="text"
                        name="description"
                        className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
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

                  {/* Submit Button */}
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
    </>
  )
}

export default AddProduct
