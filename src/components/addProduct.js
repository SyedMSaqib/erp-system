import React, { useContext, useState } from 'react'
import ProductContext from '../context/productContext'

const AddProduct = () => {
  
  
  const productContext=useContext(ProductContext)
  const{addProduct}=productContext
  const [product, setproduct] = useState({name:"",category:"",description:""})
  const handleChange=(e)=>{
    setproduct({...product,[e.target.name]:e.target.value})
  }
  const onClick=(event)=>{
    event.preventDefault();
    addProduct(product.name,product.description,product.category)
    

  }
  
  
  return (
    <div className="  shadow-xl w-full lg:ml-96 mr-52 my-20 md:ml-96 mr-52 my-20 sm:ml-96 mr-52 my-20  ">
      <div className='lg:pl-20 pr-28 md:pl-20 pr-28 sm:pl-20 pr-28'>

      
    <h1 className='font-semibold py-8'>Add Product</h1>
<form className='pt-10'>
    
  
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
        Name
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="description" placeholder="" name='name' onChange={handleChange}/>
    
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
        Description
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="description" placeholder="" name='description' onChange={handleChange}/>
      <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
        Category
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="description" placeholder="" minLength={5} name='category' onChange={handleChange}/>
    
    </div>
  </div>

  
  <div className='lg:ml-48 pl-11 sm:ml-96 md:ml-36'>
  <button onClick={onClick}
  type="button"
  class="  inline-block rounded bg-neutral-50 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-slate-400 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]">
  Submit
</button>
      </div>
    
    </div>
  </div>
</form>
</div>
  </div>


  )
}

export default AddProduct