import React from 'react'
import ProductContext from '../context/productContext'
import { useContext } from 'react'
import DeleteButton from './deleteButton'
import UpdateButton from './updateButton'
import { Link } from 'react-router-dom'


const ViewProductCard = (props) => {
  const productContext=useContext(ProductContext )
  const {deleteProduct,setproductId,setupdateFormValues}=productContext 
  const productData=()=>{
    setproductId(props.data._id)
    setupdateFormValues({name:props.data.name,
                         category:props.data.category,
                        price: props.data.price,
                      quantity:props.data.quantity,
                    description:props.data.description})
  }
  
  return (
   
      <div className=" flex w-full max-w-lg  lg:pl-8     md:pl-0 sm:pl-0 ">
        <div className="  w-60  shadow-lg rounded-lg border-2 border-double border-gray-300   ">
           
            <div className='flex '>

        <Link className='pl-40 '  to={'/update'} onClick={productData} ><UpdateButton/></Link>
        

            <button className='pl-3' onClick={()=>{ deleteProduct(props.data._id)}}><DeleteButton/></button>
                    </div>
  <div className="px-6 ">
    <div className="font-semibold text-xl mb-2 w-20">Name</div>
  
    <p className="text-gray-700  text-sm ">
    {props.data.name}
    </p>
    <hr className=" h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
    
    
  </div>
  <div className="px-6  ">
    <div className="font-semibold text-xl mb-2 w-20">Price</div>
  
    <p className="text-gray-700 text-sm">
    {props.data.price}
    </p>
    <hr className=" h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
  </div>
  <div className="px-6 ">
    <div className="font-semibold text-xl mb-2 w-20">Quantity</div>
  
    <p className="text-gray-700 text-base">
    {props.data.quantity}
    </p>
    <hr className=" h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
  </div>
  <div className="px-6 ">
    <div className="font-semibold text-xl mb-2">Category</div>
    <p className="text-gray-700 text-sm">
    {props.data.category}
    </p>
    <hr className=" h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
  </div>
  <div className="px-6 ">
    <div className="font-semibold text-xl mb-2 ">Description</div>
    <p className="text-gray-700 text-sm overflow-auto">
    {props.data.description} 
    </p>
    <hr className=" h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
  </div>
    
</div>
        
    </div>
   
  )
}

export default ViewProductCard