import React, { useContext, useState, useEffect } from 'react'
import ProductContext from '../../context/product/productContext'
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import validator from 'validator';

const UpdateModal = () => {
    
    let Navigate = useNavigate(); 
    const productContext=useContext(ProductContext)
    const{updateProduct,productId,updateFormValues}=productContext
    const [product, setproduct] = useState({updateFormValues})
    const [ProductName, setProductName] = useState(false);
    const [ProductPrice, setProductPrice] = useState(false);
    const [ProductQuantity, setProductQuantity] = useState(false);
    const NameValidator=(str)=> {
      return /^[A-Za-z\s]+$/.test(str);
    }
    useEffect(() => {
        setproduct(updateFormValues);
      }, [updateFormValues]);
    const handleChange=(e)=>{
      setproduct({...product,[e.target.name]:e.target.value})
    }
    const onClick=(event)=>{
      event.preventDefault();
      if (product !== null) {
        if (product.category === '' || product.description === '') {
          toast.error('Please Enter All Fields');
        } else {
          if(NameValidator(product.name))
          {
            setProductName(true)
          } else {
            toast.error('Enter Valid Name');
            setProductPrice(false);
            setProductQuantity(false);
          }
          if (validator.isNumeric(product.quantity)) {
            setProductQuantity(true);
          } else {
            toast.error('Enter Valid Quantity');
            setProductName(false);
            setProductPrice(false);
          }
          if (validator.isNumeric(product.price)) {
            setProductPrice(true);
          } else {
            toast.error('Enter Valid Price');
            setProductName(false);
            setProductQuantity(false);
          }
        }}
       
    
     
    }
    useEffect(() => {
      if(ProductName&&ProductPrice&&ProductQuantity)
      {
        AddProductToDb()
      }
      console.log([ProductName,ProductPrice,ProductQuantity])
    }, [ProductName,ProductPrice,ProductQuantity])

  
  const AddProductToDb=()=>{
    updateProduct(productId,product.name,product.description,product.category,product.quantity,product.price)
    toast.success(`${product.name} Updated Successfuly`)
  Navigate("/viewProduct")
  }
    
    
    return (
      <div className="flex justify-center items-center w-screen " >
      <div className="  shadow-xl w-full lg:ml-96 mr-52 my-20 md:ml-96 mr-52 my-20 sm:ml-96 mr-52 my-20  ">
        <div className='lg:pl-20 border-2 rounded-lg pr-28 md:pl-20 pr-28 sm:pl-20 pr-28'>
     {console.log(product)}   
       
      <h1 className='font-semibold py-8'>Update Product</h1>
  <form className='pt-10'>
      
    
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full px-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
          Name
        </label>
        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="description" placeholder="" name='name' onChange={handleChange} value={updateFormValues?product.name:""}/>
      
      </div>
    </div>
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full px-3">
        
        <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full px-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
          Category
        </label>
        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="description" placeholder="" minLength={5} name='category' onChange={handleChange} value={updateFormValues?product.category:""}/>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
          Price
        </label>
        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="description" placeholder="" minLength={5} name='price' onChange={handleChange} value={updateFormValues?product.price:""}/>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
          Quantity
        </label>
        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="description" placeholder="" minLength={5} name='quantity' onChange={handleChange} value={updateFormValues?product.quantity:""}/>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
          Description
        </label>
        <input className=" h-40 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="description" placeholder="" name='description' onChange={handleChange} value={updateFormValues? product.description:""}/>
      
      </div>
    </div>
  
    
    <div className="flex justify-center   " >
  
  
    <button onClick={onClick}  class="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group">
  <span class="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
  <span class="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
  <span class="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
  <span class="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
  <span class="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
  <span class="relative transition-colors duration-300 delay-200 group-hover:text-white ease">Submit</span>
  </button>
        </div>
      
      </div>
    </div>
  </form>
  </div>
  </div>
    </div>
  
  
    )
}

export default UpdateModal