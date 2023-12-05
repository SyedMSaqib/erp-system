import React, { useContext, useState, useEffect } from "react";
import customerSaleContext from "../../../context/customerSale/customerSaleContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import validator from "validator";
import SelectData from "./icons/selectData";
import SetProduct from "./Modals/setProduct";
import ProductContext from "../../../context/product/productContext";
import SetCustomer from "./Modals/setCustomer";
import customerContext from "../../../context/customer/customerContext";
import SalePlaced from "../../saleTrails/animatedIcons/salePlaced.json"
import Lottie from "lottie-react";


const AddCustomerSale = () => {
  
  const Navigate = useNavigate();
  const { addCustomerSale } = useContext(customerSaleContext);
  const { setproductModelData,productModelData, setisVisible } = useContext(ProductContext);
  const { setcustomerModalData,customerModalData, setisVisibleModal } = useContext(customerContext);
  const [availablestock, setavailablestock] = useState(false);
  const [quantity, setquantity] = useState("");
  const [product, setproduct] = useState("");
  const [productId, setproductId] = useState("");
  const [customerId, setcustomerId] = useState("");
  const [customerName, setcustomerName] = useState("");
  const [CustomerIdValid, setCustomerIdValid] = useState(false);
  const [ProductValid, setProductValid] = useState(false);
  const [QuantityValid, setQuantityValid] = useState(false);
  const [loading, setloading] = useState(false)
  const [paidStatus, setpaidStatus] = useState(false)

 const loadingTruck=() => {
    setloading(true)
    setTimeout(() => {
      setloading(false);
      Navigate("/viewCustomerSale");
    }, 5000);
 }

  useEffect(() => {
    setisVisible(false);
    setisVisibleModal(false);
    if (productModelData.name) setproduct(productModelData.name);
    if (productModelData._id) setproductId(productModelData._id);
    if (customerModalData._id) setcustomerId(customerModalData._id);
    if (customerModalData.name) setcustomerName(customerModalData.name)
  }, [productModelData, customerModalData]);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === "quantity") {
      setquantity(value);
    }
  };

  const NameValidator = (str) => {
    return /^[A-Za-z0-9\s]+$/.test(str);
  };

  const onClickProduct = () => {
    setisVisible(true);
  };

  const onClickCustomer = () => {
    setisVisibleModal(true);
  };

  const onClick = (paidStatus) => {
    setpaidStatus(paidStatus)
    console.log(paidStatus)

    if (customerId === "" || product === "" || quantity === "") {
      return toast.error("Please Enter All Fields");
    }

    if (validator.isAlphanumeric(customerId)) setCustomerIdValid(true);
    else {
      toast.error("Enter Valid customer Id");
      setCustomerIdValid(false);
    }

    if (NameValidator(product)) setProductValid(true);
    else {
      toast.error("Enter Valid product");
      setProductValid(false);
    }

    if (quantity !=="0" && quantity !== "" && validator.isNumeric(quantity)) {
      setQuantityValid(true);
    } else {
      toast.error("Enter Valid quantity");
      setQuantityValid(false);
    }

    const quantityValue = parseInt(quantity, 10);
    const availableQuantity = isNaN(productModelData.quantity) ? 0 : parseInt(productModelData.quantity, 10);

    if (quantityValue <= availableQuantity) {
      setavailablestock(true)
      
    }

    if (quantityValue > availableQuantity) {
      toast.error(
        <div className="text-center">
          <strong>Insufficient Stock</strong>
          <div>Available Stock: {availableQuantity}</div>
        </div>
      );
      setavailablestock(false);
    }
  };

  useEffect(() => {
    if (CustomerIdValid && ProductValid && QuantityValid && availablestock) {
      if(paidStatus)
      addCustomerSale(customerId, product, quantity,customerName,productId,paidStatus);
    else
    addCustomerSale(customerId, product, quantity,customerName,productId,paidStatus);

      setproduct("");
      setcustomerId("");
      setcustomerName("");
      setproductId("")
      toast.success(<span><span className='font-bold'>Sale Added : </span>{product}</span>);
      setproductModelData({});
      setcustomerModalData({});
      loadingTruck()
    }
  }, [CustomerIdValid, ProductValid, QuantityValid, availablestock]);

  if(loading)
  return(
<div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", 
        marginLeft:"90px"
      }}
    >
      <Lottie
        animationData={SalePlaced}
        loop={true}
        style={{ width: "150px", height: "150px" }}
      />
    </div>
  )

  return (
    <>
      <SetProduct />
      <SetCustomer />
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

              <div  className="bg-white dark:bg-gray-900 flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700">
                      <input
                        className="peer dark:bg-gray-900 block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0 dark:text-gray-300"
                    type="text"
                    name="quantity"
                    placeholder="Quantity"
                    onChange={handleChange}
                  />
                  <label
                    html="quantity"
                    className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                  >
                    Quantity
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
                    name="customerId"
                    placeholder="Customer Id"
                    onChange={handleChange}
                    value={customerId}
                    disabled={true}
                  />
                  <label
                    html="company"
                    className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                  >
                    Customer Id
                  </label>
                </div>
              </div>
                <div onClick={() => onClickCustomer()} className="flex items-center text-sm text-gray-500">
                  <div className="w-5  cursor-pointer">
                    <SelectData />
                  </div>
    
                </div>
              </div>
              <div className="flex flex-row ">
              <div  className="w-72">

              <div  className="bg-white dark:bg-gray-900 flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700">
                      <input
                        className="peer dark:bg-gray-900 block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0 dark:text-gray-300"
                    name="product"
                    placeholder="Product"
                    onChange={handleChange}
                    value={product}
                    disabled={true}
                  />
                  <label
                    html="Product"
                    className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                  >
                    Product
                  </label>
                </div>
              </div>
                <div onClick={() => onClickProduct()} className=" text-sm text-gray-500">
                  <div className="w-5 pt-2  cursor-pointer">
                    <SelectData />
                  </div>
                </div>
                
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
    </>
  );
};

export default AddCustomerSale;
