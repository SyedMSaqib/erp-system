import React, { useContext, useEffect } from 'react'
import ProductContext from "../../../../context/product/productContext";

const SetProduct = () => {
    const { product,getAllProducts, setproductModelData,isVisible, setisVisible } =useContext(ProductContext);
      useEffect(() => {
        getAllProducts();
        
      }, []);

      const onClickModal=(product)=>
      {
        setproductModelData(product)
     
        setisVisible(false)
        
      }

      if(!isVisible)
      return null
  return (
    <div className=" min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none ">
   <div onClick={()=>{setisVisible(false)}}  className=" backdrop-blur-sm bg-black bg-opacity-20 w-full h-full absolute"></div>
    <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white z-50 max-h-screen overflow-y-auto mt-5 ">
      <div className="">
    
     <div class="p-3  text-center space-x-4 md:block">
     <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="lg:px-6 sm:px-2 lg:py-4 sm:py-2 sm:w-5 font-medium text-gray-900">
                Name
              </th>
              
              <th scope="col" className="lg:px-12 lg:py-4 font-medium text-gray-900">
                Price
              </th>
              <th scope="col" className="lg:px-12 lg:py-4 font-medium text-gray-900">
                Quantity
              </th>
              <th scope="col" className=" lg:py-4 font-medium text-gray-900"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {product.map((productItem) => (
              <tr onClick={()=>onClickModal(productItem)} className="hover:bg-gray-50 cursor-pointer" key={productItem._id}>
                <td className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                  <div className="text-sm">
                    <div   className="font-medium text-gray-700">
                      {productItem.name}
                    </div>
                  </div>
                </td>
                <td className="px-12 py-4">{productItem.price}</td>
                <td className="px-12 py-4">{productItem.quantity}</td>

              </tr>
            ))}
          </tbody>
        </table>
     </div>
   </div>
 </div>
</div>
  )
}

export default SetProduct
