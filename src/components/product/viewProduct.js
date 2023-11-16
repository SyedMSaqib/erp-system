import React, { useContext, useEffect } from "react"
import ProductContext from "../../context/product/productContext"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"

const ViewProduct = () => {
  const { product, getAllProducts, deleteProduct, setproductId, setupdateFormValues } = useContext(ProductContext)

  useEffect(() => {
    getAllProducts()
  }, [])

  const updateProduct = (product) => {
    setproductId(product._id)
    setupdateFormValues({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      quantity: product.quantity,
    })
  }
  
  const Onclickdelete=(productId)=>
  {
    deleteProduct(productId)
    toast.success("Product Deleted")
  }
  return (
    <div className="flex justify-center items-center overflow-auto  " >
    <div className="absolute top-0 text-center ml-52 mt-2 font-semibold text-lg">Products</div>
      <div className="overflow-auto rounded-lg border border-gray-200 shadow-md m-5 mt-10 ml-64 ">
        
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="lg:px-6 sm:px-2 lg:py-4 sm:py-2 sm:w-5 font-medium text-gray-900">
                No
              </th>
              <th scope="col" className="lg:px-6 sm:px-2 lg:py-4 sm:py-2 sm:w-5 font-medium text-gray-900">
                Name
              </th>
              <th scope="col" className="lg:px-12 lg:py-4 font-medium text-gray-900">
                Description
              </th>
              <th scope="col" className="lg:px-12 lg:py-4 font-medium text-gray-900">
                Category
              </th>
              <th scope="col" className="lg:px-12 lg:py-4 font-medium text-gray-900">
                Price
              </th>
              <th scope="col" className="lg:px-12 lg:py-4 font-medium text-gray-900">
                Quantity
              </th>
              <th scope="col" className="lg:px-6 lg:py-4 font-medium text-gray-900"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {product.map((productItem,index) => (
              <tr className={`transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 `}  key={productItem._id}>
                 <td className="px-6 py-4">{index+1}</td>
                <td className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                  <div className="text-sm">
                    <div className="font-medium text-gray-700">{productItem.name}</div>
                  </div>
                </td>
                <td className="px-12 py-4">{productItem.description}</td>
                <td className="px-12 py-4">{productItem.category}</td>
                <td className="px-12 py-4">{productItem.price}</td>
                <td className="px-12 py-4">{productItem.quantity}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-4">
                    <button
                      x-data="{ tooltip: 'Delete' }"
                      onClick={() => {
                        Onclickdelete(productItem._id)
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="red"
                        className="h-6 w-6"
                        x-tooltip="tooltip"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                    <Link x-data="{ tooltip: 'Edit' }" to={`/update`} onClick={() => updateProduct(productItem)}>
                      <div className="">
                        <svg
                          fill="#000000"
                          width="25px"
                          height="25px"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon flat-color"
                        >
                          <path
                            d="M19,2a1,1,0,0,0-1,1V5.33A9,9,0,0,0,3,12a1,1,0,0,0,2,0A7,7,0,0,1,16.86,7H14a1,1,0,0,0,0,2h5a1,1,0,0,0,1-1V3A1,1,0,0,0,19,2Z"
                            fill="rgb(0, 0, 0)"
                          ></path>
                          <path
                            d="M20,11a1,1,0,0,0-1,1A7,7,0,0,1,7.11,17H10a1,1,0,0,0,0-2H5a1,1,0,0,0-1,1v5a1,1,0,0,0,2,0V18.67A9,9,0,0,0,21,12,1,1,0,0,0,20,11Z"
                            fill="rgb(112, 128, 144)"
                          ></path>
                        </svg>
                      </div>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
  )
}

export default ViewProduct
