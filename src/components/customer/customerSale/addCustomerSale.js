import React, { useContext, useState } from "react"
import customerSaleContext from "../../../context/customerSale/customerSaleContext"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import validator from "validator"
import { useEffect } from "react"
import SelectData from "./icons/selectData"
import SetProduct from "./Modals/setProduct"
import ProductContext from  "../../../context/product/productContext";

const AddCustomerSale = () => {
  const Navigate = useNavigate()
  const { addCustomerSale,setcustomerDataOfSale,customerDataOfSale,setisDataSet,isDataSet } = useContext(customerSaleContext)
  const { productModelData,setproductModelData,setisVisible }=useContext(ProductContext);

    useEffect(() => {
      setcustomerDataOfSale("")
      setisVisible(false)
    }, [])


  const [customerSale, setcustomerSale] = useState({
    customerId: customerDataOfSale._id,
    product: productModelData.name,
    quantity: "",
  })
  const [CustomerIdValid, setCustomerIdValid] = useState(false)
  const [ProductValid, setProductValid] = useState(false)
  const [QuantityValid, setQuantityValid] = useState(false)

  const handleChange = (e) => {
   
    const { name, value } = e.target;
   
      
      setcustomerSale({ ...customerSale, [name]: value });
    

  }
 
  const NameValidator = (str) => {
    return /^[A-Za-z0-9\s]+$/.test(str)
  }

  const onClickProduct=()=>
  {
    setisVisible(true)
  }

  const onClick = (event) => {
    event.preventDefault()
    if (customerSale.customerId === "" || customerSale.product === "" || customerSale.quantity === "") {
      return toast.error("Please Enter All Fields")
    }

    if(validator.isAlphanumeric(customerSale.customerId))
      setCustomerIdValid(true)
    else{
      toast.error("Enter Valid customer Id")
      setCustomerIdValid(false)
    }

    if (NameValidator(customerSale.product)) {
      setProductValid(true)
    } else {
      toast.error("Enter Valid Product")
      setProductValid(false)
    }

    if (validator.isNumeric(customerSale.quantity)) {
      setQuantityValid(true)
    } else {
      toast.error("Enter Valid Quantity")
      setQuantityValid(false)
    }
    setproductModelData({})
  }
  const NavigateToViewCustomers=()=>
  {
    setisDataSet(true)
    Navigate("/viewCustomers")
  }

  useEffect(() => {
    if (CustomerIdValid && ProductValid && QuantityValid) {
      addCustomerSale(customerSale.customerId, customerSale.product, customerSale.quantity)
      toast.success(`${customerSale.product} Added`)
      Navigate("/viewCustomerSale")
    }
  }, [CustomerIdValid, ProductValid, QuantityValid])

  

  return (
    <>
    <SetProduct/>
    <div  className="lg:mx-auto sm:ml-64 sm:items-end  shadow-xl h-1/2 mx-auto my-20 border bg-slate-50 border-gray-300 rounded-xl">
      <div className="pl-8 py-8 px-8  pr-8">
        <div>
          <h1 class="mb-1 font-bold text-3xl flex gap-1 items-baseline font-mono">
            Add Customer Sale<span class="text-sm text-gray-400">SAS ERP</span>
          </h1>
          <div className="grid max-w-3xl lg:gap-8 sm:gap-3 py-10 px-8 sm:grid-cols-1 bg-slate-50 rounded-md border-t-4 border-gray-400">
            <div className="grid">
              <div className="bg-white flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 ">
                <input
                  type="text"
                  name="quantity"
                  class="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                  placeholder="Quantity"
                  onChange={handleChange}
                />
                <label
                  html="quantity"
                  class="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                >
                  Quantity
                </label>
              </div>
            </div>

            <div class=" flex items-center">
              <div className="bg-white flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 ">
                <input
                  type="text"
                  name="customerId"
                  class="peer block w-full border-0 p-0 text-base text-gray-400 placeholder-gray-400 focus:ring-0"
                  placeholder="Customer Id"
                  onChange={handleChange}
                  value={customerDataOfSale._id}
                  disabled={true}
                />
                <label
                  html="company"
                  class="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                >
                  Customer Id
                </label>
              </div>
              <div onClick={()=>NavigateToViewCustomers()} className="flex items-center text-sm text-gray-500">
                <div  className="w-5 pt-4 cursor-pointer">
                  <SelectData />
                </div>
                <div className="ml-2 pt-4 cursor-pointer">
                  <div>Select Customer</div>
                </div>
              </div>
            </div>
            <div class="flex items-center">
              <div className="bg-white flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 ">
                <input
                  name="product"
                  class="peer block w-full border-0 p-0 text-base text-gray-400 placeholder-gray-400 focus:ring-0"
                  placeholder="Product"
                  onChange={handleChange}
                  value={productModelData.name}
                  disabled="true"
                />
                <label
                  html="Product"
                  class="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                >
                  Product
                </label>
              </div>
              <div onClick={()=>onClickProduct()}   className="flex items-center text-sm text-gray-500">
                <div className="w-5 pt-4 cursor-pointer">
                  <SelectData />
                </div>
                <div className="ml-2 pt-4 cursor-pointer">
                  <div>Select Product</div>
                </div>
              </div>
            </div>
            <button
              onClick={onClick}
              type="submit"
              class="mt-4 bg-slate-400 text-white  py-2 px-6 rounded-md hover:bg-slate-500 "
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default AddCustomerSale
