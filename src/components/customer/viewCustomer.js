import React, { useContext, useEffect } from "react"
import customerContext from "../../context/customer/customerContext"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import Footer from "../loginSignup/footer"

const ViewCustomer = () => {
  const { customer, getAllcustomers, deleteCustomer, setCustomerId, setupdateFormValues } = useContext(customerContext)

  useEffect(() => {
    getAllcustomers()
  }, [])

  const updateCustomer = (customer) => {
    setCustomerId(customer._id)
    setupdateFormValues({ name: customer.name, email: customer.email, phone: customer.phone })
  }
  const Onclickdelete = (customerId) => {
    deleteCustomer(customerId)
    toast.success("Customer Deleted")
  }

  return (
    <div className="dark:bg-gray-900">
    <div className="flex justify-center items-center  ">
      <div className="absolute top-0 text-center ml-52 mt-2 font-semibold text-lg dark:text-gray-300">Customers</div>
      <div className="overflow-auto shadow-lg rounded-xl border border-gray-200 dark:border-gray-600  m-5 mt-10 ml-64 ">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500 dark:bg-gray-950">
          <thead className="bg-gray-50 dark:bg-gray-950 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-400">
                No
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-400">
                Name
              </th>
              <th scope="col" className="px-12 py-4 font-medium text-gray-900 dark:text-gray-400">
                Phone
              </th>
              <th scope="col" className="px-20 py-4 font-medium text-gray-900 dark:text-gray-400">
                Id
              </th>
              <th scope="col" className=" py-4 font-medium text-gray-900 dark:text-gray-400"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-600 border-t border-gray-100 dark:border-gray-900">
            {customer.map((customerItem, index) => (
              <tr
                className={`transition-colors ${index % 2 === 0 ? "bg-white dark:bg-gray-950" : "dark:bg-gray-950 bg-gray-50 "} hover:bg-gray-100 dark:hover:bg-gray-800 `}
                key={customerItem._id}
              >
                <td className="px-6 py-4 dark:text-gray-200">{index + 1}</td>
                <td className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                  <div className="text-sm flex">
                    <div>
                      <div className="font-medium text-gray-700 dark:text-gray-300 ">{customerItem.name}</div>
                      <div className="text-gray-400 ">{customerItem.email}</div>
                    </div>
                  </div>
                </td>
                <td className=" px-12 py-4">
                  <span className=" inline-flex items-center gap-1 dark:bg-green-50/5 bg-green-50 px-2 py-1 text-xs font-semibold dark:text-green-300 text-green-600 ">
                    {customerItem.phone}
                  </span>
                </td>
                <td className=" px-12 py-4">
                  <span className=" inline-flex items-center gap-1  bg-sky-50 dark:bg-sky-50/5 px-2 py-1 text-xs font-semibold dark:text-sky-300 text-sky-600 ">
                    {customerItem._id}
                  </span>
                  {
                    <button
                      onClick={() => {
                        // Function to copy the customer ID to clipboard
                        const textField = document.createElement("textarea")
                        textField.innerText = customerItem._id
                        document.body.appendChild(textField)
                        textField.select()
                        document.execCommand("copy")
                        textField.remove()
                      }}
                      className="pl-3 text-blue-500 hover:text-blue-600 "
                    >
                      Copy ID
                    </button>
                  }
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-4">
                    <button
                      x-data="{ tooltip: 'Delete' }"
                      onClick={() => {
                        Onclickdelete(customerItem._id)
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="red "
                        class="h-6 w-6"
                        x-tooltip="tooltip"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                    <Link
                      x-data="{ tooltip: 'Edit' }"
                      to={`/updateCustomers`}
                      onClick={() => updateCustomer(customerItem)}
                    >
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
                    </Link>
                  </div>
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

export default ViewCustomer
