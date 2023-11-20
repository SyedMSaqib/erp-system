import React, { useContext, useEffect } from "react"
import customerSaleContext from "../../../context/customerSale/customerSaleContext"
import ConfirmDeleteSale from "./Modals/confirmDeleteSale"
import CustomerSales from "./graphs/customerSales"
import Footer from "../../loginSignup/footer"

const ViewCustomerSale = () => {
  const {
    customerSale,
    getAllcustomersSales,
    setconfirmDeleteSaleId,
    setisVisibleConfirmDelete,
    customerSaleGraph,
    setcustomerSaleGraph,
  } = useContext(customerSaleContext)

  useEffect(() => {
    getAllcustomersSales()
  }, [])

  const formatMongoDate = (mongoDate) => {
    const dateObject = new Date(mongoDate)

    const year = dateObject.getFullYear()
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0")
    const day = dateObject.getDate().toString().padStart(2, "0")
    const hours = dateObject.getHours().toString().padStart(2, "0")
    const minutes = dateObject.getMinutes().toString().padStart(2, "0")

    return `${year}-${month}-${day} ${hours}:${minutes}`
  }
  const Onclickdelete = (ItemId) => {
    setconfirmDeleteSaleId(ItemId)
    setisVisibleConfirmDelete(true)
  }
  const showGrahp = (customerId) => {
    setcustomerSaleGraph({ isvisible: true, customerId: customerId })
  }

  return (
    <div className="dark:bg-gray-900">
      <CustomerSales />
      <ConfirmDeleteSale />
      <div className="flex justify-center items-center  ">
        <div className="absolute top-0 text-center ml-52 mt-2 font-semibold text-lg dark:text-gray-300">Sales</div>
        <div className="overflow-auto rounded-lg border dark:border-gray-600 border-gray-200 shadow-md m-5 mt-10 ml-64 ">
          <table className=" border-collapse bg-white text-left text-sm text-gray-500 ">
            <thead className="bg-gray-50 dark:bg-gray-950">
              <tr>
                <th scope="col" className="px-3 py-4 font-medium text-gray-900 dark:text-gray-400">
                  No
                </th>
                <th scope="col" className="px-3 py-4 font-medium text-gray-900 dark:text-gray-400">
                  Customer Name
                </th>
                <th scope="col" className="px-3 py-4 font-medium text-gray-900 dark:text-gray-400">
                  Customer ID
                </th>
                <th scope="col" className="px-3 py-4 font-medium text-gray-900 dark:text-gray-400">
                  Sale ID
                </th>
                <th scope="col" className="px-3 py-4 font-medium text-gray-900 dark:text-gray-400">
                  Product
                </th>
                <th scope="col" className="px-3 py-4 font-medium text-gray-900 dark:text-gray-400">
                  Product ID
                </th>
                <th scope="col" className="px-3 py-4 font-medium text-gray-900 dark:text-gray-400">
                  Quantity
                </th>
                <th scope="col" className="px-3 py-4 font-medium text-gray-900 dark:text-gray-400">
                  Date
                </th>
                <th scope="col" className="px-3 py-4 font-medium text-gray-900 dark:text-gray-400"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-600 border-t border-gray-100 dark:border-gray-600">
              {customerSale.map((saleItem, index) => (
                <tr
                  className={`transition-colors  ${
                    index % 2 === 0 ? "bg-white dark:bg-gray-950" : "bg-gray-50 dark:bg-gray-950"
                  } hover:bg-gray-100 dark:hover:bg-gray-800 `}
                  key={saleItem._id}
                >
                  <td className="px-3 py-4 dark:text-gray-400">{index + 1}</td>
                  <td
                    onClick={() => {
                      showGrahp(saleItem.customerId)
                    }}
                    className="flex dark:text-gray-400 gap-3 px-5 py-4 font-normal text-gray-900 hover:cursor-pointer"
                  >
                    {saleItem.customerName}
                  </td>
                  <td className=" px-3 py-4">
                    <span
                      onClick={() => {
                        showGrahp(saleItem.customerId)
                      }}
                      className=" inline-flex items-center gap-1  bg-cyan-50 dark:bg-cyan-50/5 px-2 py-1 text-xs font-semibold text-cyan-800 hover:cursor-pointer"
                    >
                      {saleItem.customerId}
                    </span>
                  </td>
                  <td className=" px-3 py-4">
                    <span className=" inline-flex items-center gap-1  bg-sky-50 dark:bg-sky-50/5 px-2 py-1 text-xs font-semibold text-sky-600">
                      {saleItem._id}
                    </span>
                  </td>
                  <td className="px-3 py-4">{saleItem.product}</td>
                  <td className=" px-5 py-4">
                    <span className=" inline-flex items-center gap-1  bg-cyan-50 dark:bg-cyan-50/5 px-2 py-1 text-xs font-semibold text-cyan-800">
                      {saleItem.productId}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-semibold">{saleItem.quantity}</td>
                  <td className="px-3 py-4">{formatMongoDate(saleItem.date)}</td>
                  <td className="px-1 pr-5 py-4 ">
                    <svg
                      onClick={() => {
                        Onclickdelete(saleItem._id)
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="red "
                      className="h-6 w-6 cursor-pointer"
                      x-tooltip="tooltip"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='ml-52'>
  <Footer/>
</div>
</div>
    
  )
}

export default ViewCustomerSale
