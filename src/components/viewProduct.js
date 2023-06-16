import React, { useContext, useEffect } from 'react';
import Card from './viewProductCard';
import ProductContext from '../context/productContext';
const ViewProduct = () => {
  const {product,getAllProducts}=useContext(ProductContext)
  useEffect(() => {
    getAllProducts()
  
  }, [])
  
  return (
    
    <div className='flex flex-wrap ml-60 mt-20 '>
      
        {product.map((product)=>{
         return <div className=' pt-5 pl-1   '> <Card key={product._id} data={product}/></div>
        })}
    </div>
  );
};

export default ViewProduct;
