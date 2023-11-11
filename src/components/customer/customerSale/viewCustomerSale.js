import React, { useContext, useEffect } from "react"
import customerSaleContext from "../../../context/customerSale/customerSaleContext"

const ViewCustomerSale = () => {
  const { customerSale, getAllcustomersSales,deleteCustomerSale } = useContext(customerSaleContext)

  useEffect(() => {
    getAllcustomersSales()
  }, [])

  return (
    <div>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 ml-72 ">
        <table className="overflow-x-auto border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Customer Name
              </th>
              <th scope="col" className="px-16 py-4 font-medium text-gray-900">
                Customer ID
              </th>
              <th scope="col" className="px-16 py-4 font-medium text-gray-900">
                Product
              </th>
              <th scope="col" className="px-16 py-4 font-medium text-gray-900">
                Quantity
              </th>
              <th scope="col" className="px-16 py-4 font-medium text-gray-900">
                Date
              </th>
              <th scope="col" className="px-16 py-4 font-medium text-gray-900">
                
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {customerSale.map((saleItem) => (
              <tr className="hover:bg-gray-50" key={saleItem._id}>
                <td className="flex gap-3 px-6 py-4 font-normal text-gray-900">{saleItem.customerName}</td>
                <td className="px-16 py-4">{saleItem.customerId}</td>
                <td className="px-16 py-4">{saleItem.product}</td>
                <td className="px-16 py-4">{saleItem.quantity}</td>
                <td className="px-16 py-4">{saleItem.date}</td>
                <td onClick={()=>{deleteCustomerSale(saleItem._id)}} className="px-5 py-4">{"Delete"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewCustomerSale
