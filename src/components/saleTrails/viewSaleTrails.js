import React, { useContext, useEffect } from "react"
import SaleTrailContext from "../../context/saleTrail/saleTrailContext"
import Footer from "../loginSignup/footer"
import toast from "react-hot-toast"
import Lottie from "lottie-react"
import Success from "./animatedIcons/success.json"
import Loading from "./animatedIcons/loading.json"
import { useState } from "react"

const ViewSaleTrails = () => {
  const saleTrailContext = useContext(SaleTrailContext)
  const { saleTrails, getAllSaleTrails, updateSaleTrail } = saleTrailContext
  const [loading, setloading] = useState(true)


  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    getAllSaleTrails()
  }, [])
  
  // useEffect(() => {
  //   if(!saleTrails)
  //   {
  //     setloading(true)
  //   }
  //   else{
  //     setloading(false)
  //   }
  // }, [saleTrails])

 

  const formatMongoDate = (mongoDate) => {
    const dateObject = new Date(mongoDate)

    const year = dateObject.getFullYear()
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0")
    const day = dateObject.getDate().toString().padStart(2, "0")
    const hours = dateObject.getHours().toString().padStart(2, "0")
    const minutes = dateObject.getMinutes().toString().padStart(2, "0")

    return `${year}-${month}-${day} ${hours}:${minutes}`
  }


  const Updatepaid = async (id) => {
    try {
      await updateSaleTrail(id)
      toast.success("Sale Paid")
      getAllSaleTrails()
    } catch (error) {
      console.error("Error updating sale trail:", error)
    }
  }
 
  if(loading)
  return(
<div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", 
        marginLeft:"190px"
      }}
    >
      <Lottie
        animationData={Loading}
        loop={true}
        style={{ width: "150px", height: "150px" }}
      />
    </div>
  )
  return (
    <div className="dark:bg-gray-900">
      <div className="flex justify-center items-center  ">
        <div className="absolute top-0 text-center ml-52 mt-2 font-semibold text-lg dark:text-gray-300">
          Sales Trails
        </div>
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
                  Quantity
                </th>
                <th scope="col" className="px-3 py-4 font-medium text-gray-900 dark:text-gray-400">
                  Payment
                </th>
                <th scope="col" className="px-3 py-4 font-medium text-gray-900 dark:text-gray-400">
                  Status
                </th>
                <th scope="col" className="px-8 py-4 font-medium text-gray-900 dark:text-gray-400">
                  Action
                </th>
                <th scope="col" className="px-3 py-4 font-medium text-gray-900 dark:text-gray-400">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-600 border-t border-gray-100 dark:border-gray-600">
              {saleTrails&&saleTrails.saleTrails.map((saleTrails, index) => (
                <tr
                  className={`transition-colors  ${
                    index % 2 === 0 ? "bg-white dark:bg-gray-950" : "bg-gray-50 dark:bg-gray-950"
                  } hover:bg-gray-100 dark:hover:bg-gray-800 `}
                  key={saleTrails._id}
                >
                  <td className="px-3 py-4 dark:text-gray-400">{index + 1}</td>
                  <td className="flex dark:text-gray-400 gap-3 px-5 py-6 font-normal text-gray-900 hover:cursor-pointer">
                    {saleTrails.customerName}
                  </td>
                  <td className=" px-3 py-4">
                    <span className=" inline-flex items-center gap-1  bg-cyan-50 dark:bg-cyan-50/5 px-2 py-1 text-xs font-semibold dark:text-cyan-300 text-cyan-800 hover:cursor-pointer">
                      {saleTrails.customerId}
                    </span>
                  </td>
                  <td className=" px-3 py-4">
                    <span className=" inline-flex items-center gap-1  bg-sky-50 dark:bg-sky-50/5 px-2 py-1 text-xs font-semibold dark:text-sky-300 text-sky-600">
                      {saleTrails.saleId}
                    </span>
                  </td>
                  <td className="px-3 py-4 dark:text-gray-400">{saleTrails.productName}</td>
                  <td className="px-3 py-4 dark:text-gray-400">{saleTrails.productQuantity}</td>
                  <td className="px-3 py-4 dark:text-gray-400 font-semibold w-24">{saleTrails.saleAmount} Rs</td>
                  <td className="px-3 py-4">
                    {saleTrails.paid ? (
                      <span className=" inline-flex items-center gap-1  bg-green-200 dark:bg-green-800/5 px-2 py-1 text-xs font-semibold dark:text-green-400 text-green-700 hover:cursor-pointer justify-center w-20">
                        Paid
                      </span>
                    ) : (
                      <span className=" inline-flex items-center gap-1  bg-yellow-300 dark:bg-yellow-300/5 px-2 py-1 text-xs font-semibold dark:text-yellow-300 text-yellow-700 hover:cursor-pointer w-20">
                        In Progress
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-4 ">
                    {!saleTrails.paid ? (
                      <button
                        onClick={() => {
                          Updatepaid(saleTrails._id)
                        }}
                        className="border border-black w-20 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-200 bg-gray-300 text-gray-900"
                      >
                        Paid
                      </button>
                    ) : (
                      <Lottie
                        animationData={Success}
                        loop={false}
                        style={{ width: "45px", height: "45px", marginLeft: "20px" }}
                      />
                    )}
                  </td>
                  <td className="px-3 py-4">{formatMongoDate(saleTrails.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="ml-52">
        <Footer />
      </div>
    </div>
  )
}

export default ViewSaleTrails
