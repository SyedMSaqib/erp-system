import React, { useContext, useEffect, useState } from "react"
import VenderTrailContext from "../../context/venderTrail/venderTrailContext"
import Footer from "../loginSignup/footer"
import toast from "react-hot-toast"
import Lottie from "lottie-react"
import Success from "../saleTrails/animatedIcons/success.json"
import Loading from "../saleTrails/animatedIcons/loading.json"

const ViewVenderTrails = () => {
  const venderTrailContext = useContext(VenderTrailContext)
  const { venderTrails, getAllVenderTrails, updateVenderTrail } = venderTrailContext
  const [loading, setloading] = useState(true)
  const [open, setopen] = useState("")
  useEffect(() => {
    setTimeout(() => {
      setloading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    getAllVenderTrails()
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

  const updatePaid = async (id) => {
    try {
      await updateVenderTrail(id)
      toast.success("Vender Paid")
      getAllVenderTrails()
    } catch (error) {
      console.error("Error updating vender trail:", error)
    }
  }
  const toggleDetails = (index) => {
    setopen(open === index ? null : index)
  }
  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          marginLeft: "190px",
        }}
      >
        <Lottie animationData={Loading} loop={true} style={{ width: "150px", height: "150px" }} />
      </div>
    )
  return (
    <div className="dark:bg-gray-900">
      <div className="flex justify-center items-center  ">
        <div className="absolute top-0 text-center ml-52 mt-2 font-semibold text-lg dark:text-gray-300">
          Vender Trails
        </div>
        <div className="overflow-auto rounded-lg border dark:border-gray-600 border-gray-200 shadow-md m-5 mt-10 ml-64 ">
          <table className=" border-collapse bg-white text-left text-sm text-gray-500 ">
            <thead className="bg-gray-50 dark:bg-gray-950">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-400">
                  No
                </th>
                <th scope="col" className="px-3 py-4 font-medium text-gray-900 dark:text-gray-400">
                  Purchase ID
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
              {venderTrails &&
                venderTrails.venderTrails.map((venderTrail, index) => (
                  <React.Fragment key={venderTrail._id}>
                    <tr
                      className={`transition-colors  ${
                        index % 2 === 0 ? "bg-white dark:bg-gray-950" : "bg-gray-50 dark:bg-gray-950"
                      } hover:bg-gray-100 dark:hover:bg-gray-800 `}
                      key={venderTrail._id}
                    >
                      <td className="px-6 py-4 dark:text-gray-400">{index + 1}</td>
                      <td onClick={() => toggleDetails(index)} className=" px-3 py-4">
                        <span className=" inline-flex items-center gap-1  bg-cyan-50 dark:bg-cyan-50/5 px-2 py-1 text-xs font-semibold dark:text-cyan-300 text-cyan-800 hover:cursor-pointer">
                          {venderTrail._id}
                        </span>
                      </td>
                      <td className="px-3 py-4 dark:text-gray-400">{venderTrail.productQuantity}</td>
                      <td className="px-3 py-4 dark:text-gray-400 font-semibold w-24">
                        {venderTrail.purchaseAmount} Rs
                      </td>
                      <td className="px-3 py-4">
                        {venderTrail.paid ? (
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
                        {!venderTrail.paid ? (
                          <button
                            onClick={() => {
                              updatePaid(venderTrail._id)
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
                      <td className="px-3 py-4">{formatMongoDate(venderTrail.date)}</td>
                    </tr>
                    {open === index ? (
                      <tr className="bg-gray-400 dark:bg-gray-950">
                        <td colSpan="9" className="bg-gray-100 dark:bg-gray-950 p-10">
                          <div className="flex flex-col items-center justify-center">
                            <h2 className="text-2xl font-semibold mb-4 dark:text-gray-300">Vender Trail Details</h2>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex flex-col">
                                <span className="font-semibold">Product Id:</span>
                                <p className="text-gray-700 dark:text-gray-300">{venderTrail._id}</p>
                              </div>

                              <div className="flex flex-col">
                                <span className="font-semibold">Vendor Id:</span>
                                <p className="text-gray-700 dark:text-gray-300">{venderTrail.venderId}</p>
                              </div>

                              <div className="flex flex-col">
                                <span className="font-semibold">Product Name:</span>
                                <p className="text-gray-700 dark:text-gray-300">{venderTrail.productName}</p>
                              </div>
                              <div className="flex flex-col">
                                <span className="font-semibold">Vender Name:</span>
                                <p className="text-gray-700 dark:text-gray-300">{venderTrail.venderName}</p>
                              </div>
                              <div className="flex flex-col">
                                <span className="font-semibold">Unit price:</span>
                                <p className="text-gray-700 dark:text-gray-300">{venderTrail.singleUnitPrice} Rs</p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : null}
                  </React.Fragment>
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

export default ViewVenderTrails
