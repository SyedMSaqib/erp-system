import React from 'react'
import ProductContext from '../context/productContext'
import { useContext } from 'react'
import DeleteButton from './deleteButton'
import UpdateButton from './updateButton'


const ViewProductCard = (props) => {
  const productContext=useContext(ProductContext )
  const {deleteProduct}=productContext 
  
  return (
   
      <div className="flex w-full max-w-lg lg:pl-8     md:pl-0 sm:pl-0 ">
        <div className=" w-60  shadow-lg rounded-lg border-2 border-double border-gray-300   ">
           
            <div className='flex'>

        <button className='pl-40' ><UpdateButton/></button>

            <button className='pl-3' onClick={()=>{ deleteProduct(props.data._id)}}><DeleteButton/></button>
                    </div>
  <div className="px-6 py-4">
    <div className="font-semibold text-xl mb-2 w-20">Name</div>
  
    <p className="text-gray-700 text-base">
    {props.data.name}
    </p>
    
  </div>
  <div className="px-6 ">
    <div className="font-semibold text-xl mb-2 w-20">Price</div>
  
    <p className="text-gray-700 text-base">
    {props.data.price}
    </p>
    
  </div>
  <div className="px-6 ">
    <div className="font-semibold text-xl mb-2 w-20">Quantity</div>
  
    <p className="text-gray-700 text-base">
    {props.data.quantity}
    </p>
    
  </div>
  <div className="px-6 ">
    <div className="font-semibold text-xl mb-2">Category</div>
    <p className="text-gray-700 text-base">
    {props.data.category}
    </p>
    
  </div>
  <div className="px-6 ">
    <div className="font-semibold text-xl mb-2 ">Description</div>
    <p className="text-gray-700 text-base overflow-auto">
    {props.data.description} 
    </p>
    
  </div>
    
</div>
        
    </div>
   
  )
}

export default ViewProductCard