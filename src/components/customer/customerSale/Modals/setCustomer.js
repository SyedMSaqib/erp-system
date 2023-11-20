import React, { useContext, useEffect } from "react"
import customerContext from "../../../../context/customer/customerContext"

const SetCustomer = () => {
  const { customer, setcustomerModalData, isVisibleModal, setisVisibleModal, getAllcustomers } = useContext(customerContext)
  useEffect(() => {
    getAllcustomers()
  }, [])

  const onClickModal=(customer)=>
  {
      setcustomerModalData(customer)
    setisVisibleModal(false)    
    
    
  }

  if (!isVisibleModal) return null
  return (
    <div className="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none ">
      <div onClick={()=>{setisVisibleModal(false)}} className="backdrop-blur-sm bg-black bg-opacity-20 w-full h-full absolute"></div>
       <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg dark:bg-gray-950 bg-white z-50  h-4/5 overflow-y-auto  ">
        <div className="">
          <div class="p-3   mt-2 text-center space-x-4 md:block">
            <table className="w-full border-collapse dark:bg-gray-950 bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-50 dark:bg-gray-950 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-400">
                    Name
                  </th>

                  <th scope="col" className=" font-medium text-gray-900 dark:text-gray-400">
                    Phone
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-600 border-t dark:border-gray-600 border-gray-100">
                {customer.map((customerItem) => (
                  <tr onClick={() => onClickModal(customerItem)} className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer" key={customerItem._id}>
                    <td className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="text-sm flex">
                        <div>
                          <div className="font-medium text-gray-700">{customerItem.name}</div>
                          <div className="text-gray-400">{customerItem.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="">{customerItem.phone}</td>
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

export default SetCustomer
