import React, { useContext, useEffect } from 'react';
import Card from './viewProductCard';
import ProductContext from '../context/productContext';
const ViewProduct = () => {
  const {product,getAllProducts}=useContext(ProductContext)
  useEffect(() => {
    getAllProducts()
  
  }, [])
  
  return (
    
    <div className='flex flex-wrap ml-52 '>
      
        {product.map((product)=>{
         return <div className='lg:w-1/3 p-4 md:w-1/2 sm:w-1/1 '> <Card key={product._id} data={product}/></div>
        })}
    </div>
  );
};

export default ViewProduct;
