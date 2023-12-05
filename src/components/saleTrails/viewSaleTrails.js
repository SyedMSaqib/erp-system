import React, { useContext, useEffect } from "react"
import SaleTrailContext from "../../context/saleTrail/saleTrailContext"
import Footer from "../loginSignup/footer"
import toast from "react-hot-toast"
import Lottie from "lottie-react"
import Success from "./animatedIcons/success.json"
import Loading from "./animatedIcons/loading.json"
import { useState } from "react"
import NoResultFound from "../customer/customerSale/icons/animations/noResultFound.json"


const ViewSaleTrails = () => {

  const saleTrailContext = useContext(SaleTrailContext)
  const { saleTrails, getAllSaleTrails, updateSaleTrail,saleTrailsSearch, setsaleTrailsSearch,setsaleTrails } = saleTrailContext
  const [loading, setloading] = useState(true)
  const [open, setopen] = useState("")


  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 1000);
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

  const toggleDetails = (index) => {
    setopen(open === index ? null : index)
  }

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
      toast.success("Sale Paid",document.documentElement.classList.contains('dark')? {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }:"");
      getAllSaleTrails()
    } catch (error) {
      console.error("Error updating sale trail:", error)
    }
  }
  const salesFSTS=saleTrailsSearch.saleTrails
  const [searchValue, setSearchValue] = useState("")
  const [showNoResult, setshowNoResult] = useState(false)

  const handleInputChange = (e) => {
    const searchElement = e.target.value
    setSearchValue(searchElement)
   
    const results = salesFSTS&&salesFSTS.filter(
      (saleSearch) =>
        
        saleSearch.saleId.toLowerCase().includes(searchElement.toLowerCase()) ||
        saleSearch.saleAmount.toString().includes(searchElement.toLowerCase()) ||
        saleSearch.productQuantity.toString().includes(searchElement.toLowerCase()) ||
        (saleSearch.paid ? "paid" : "in progress").includes(searchElement.toLowerCase()) ||
        saleSearch.customerId.toLowerCase().includes(searchElement.toLowerCase()) ||
        saleSearch.productName.toLowerCase().includes(searchElement.toLowerCase()) ||
        saleSearch.customerName.toLowerCase().includes(searchElement.toLowerCase()) ||
        saleSearch.saleAmount.toString().includes(searchElement.toLowerCase()) ||
        formatMongoDate(saleSearch.date).toString().includes(searchElement.toLowerCase())
    )
    if (Object.keys(results).length === 0) setshowNoResult(true)
    else setshowNoResult(false)
    setsaleTrails({saleTrails:results})
  }
  const SearchValue = () => {
    setSearchValue("")
    setsaleTrails(saleTrailsSearch)
    setshowNoResult(false)
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
    <div className="dark:bg-gray-900 bg-slate-50">
      <div className="flex justify-center items-center  ">
        <div className="absolute top-0 text-center ml-52 mt-2 font-semibold text-lg dark:text-gray-300">
          Sales Trails
        </div>
        <div className="flex absolute top-6  mb-[4rem] ml-[51rem]">
          <div className="relative">
            <input
              className="appearance-none dark:bg-gray-800 dark:text-gray-300 border-2 pl-10 border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-800  transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-green-600 focus:border-green-500 focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={handleInputChange}
            />
            <div className="absolute right-0 inset-y-0 flex items-center">
              <svg
                onClick={() => SearchValue()}
                xmlns="http://www.w3.org/2000/svg"
                className="-ml-1 mr-3 h-5 w-5 text-gray-400 dark:text-gray-200  hover:text-gray-500 dark:hover:text-gray-50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>

            <div className="absolute left-0 inset-y-0 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 ml-3  text-gray-400 dark:text-gray-200  hover:text-gray-500 dark:hover:text-gray-50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="overflow-auto rounded-lg border dark:border-gray-600 border-gray-200 shadow-md m-5 mt-20 ml-64 ">
        {!showNoResult ?   <table className=" border-collapse bg-white text-left text-sm text-gray-500 ">
            <thead className="bg-gray-50 dark:bg-gray-950">
              <tr>
                <th scope="col" className="px-3 py-4 font-medium text-gray-900 dark:text-gray-400">
                  No
                </th>
                <th scope="col" className="px-3 py-4 font-medium text-gray-900 dark:text-gray-400">
                  Sale ID
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
                <React.Fragment key={saleTrails._id}>
                <tr
                  className={`transition-colors  ${
                    index % 2 === 0 ? "bg-white dark:bg-gray-950" : "bg-gray-50 dark:bg-gray-950"
                  } hover:bg-gray-100 dark:hover:bg-gray-800 `}
                  key={saleTrails._id}
                >
                  <td className="px-3 py-4 dark:text-gray-400">{index + 1}</td>
                 
                  <td onClick={()=>toggleDetails(index)} className=" px-3 py-4">
                    <span className=" inline-flex items-center gap-1  bg-sky-50 dark:bg-sky-50/5 px-2 py-1 text-xs font-semibold dark:text-sky-300 text-sky-600 hover:cursor-pointer">
                      {saleTrails.saleId}
                    </span>
                  </td>
                  <td className="px-3 py-4 dark:text-gray-400">{saleTrails.productQuantity}</td>
                  <td className="px-3 py-4 dark:text-gray-400 font-semibold w-24">{saleTrails.saleAmount} Rs</td>
                  <td className="px-3 py-4">
                    {saleTrails.paid ? (
                      <span className=" inline-flex items-center gap-1  bg-green-200 dark:bg-green-800/5 px-2 py-1 text-xs font-semibold dark:text-green-400 text-green-700 hover:cursor-pointer justify-center w-20">
                        Paid
                      </span>
                    ) : (
                      <span className=" inline-flex items-center gap-1  bg-yellow-300 dark:bg-yellow-300/5 px-2 py-1 text-xs font-semibold dark:text-yellow-300 text-yellow-700 hover:cursor-pointer w-20 pl-5">
                        Un Paid
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
                {open === index ? (
                      <tr className="bg-gray-400 dark:bg-gray-950 border ">
                        <td colSpan="9" className="bg-gray-50 dark:bg-gray-950 p-10 border dark:border-gray-700 border-gray-200">
                          <div className="flex flex-col items-center justify-center">
                            <h2 className="text-2xl font-semibold mb-4 dark:text-gray-300">Sale Trail Details</h2>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex flex-col">
                                <span className="font-semibold">Customer Id:</span>
                                <p className="text-gray-700 dark:text-gray-300">{saleTrails.customerId}</p>
                              </div>

                              <div className="flex flex-col">
                                <span className="font-semibold">Trail Id:</span>
                                <p className="text-gray-700 dark:text-gray-300">{saleTrails._id}</p>
                              </div>

                              <div className="flex flex-col">
                                <span className="font-semibold">Product Name:</span>
                                <p className="text-gray-700 dark:text-gray-300">{saleTrails.productName}</p>
                              </div>
                              <div className="flex flex-col">
                                <span className="font-semibold">Customer Name:</span>
                                <p className="text-gray-700 dark:text-gray-300">{saleTrails.customerName}</p>
                              </div>
                              <div className="flex flex-col">
                                <span className="font-semibold">Unit price:</span>
                                <p className="text-gray-700 dark:text-gray-300">{saleTrails.singleUnitPrice} Rs</p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : null}
                </React.Fragment>
              ))}
            </tbody>
          </table>:""}
        </div>
      </div>
      {showNoResult ? (
        <div className="flex justify-center">
          <Lottie
            animationData={NoResultFound}
            loop={true}
            style={{ width: "245px", height: "245px", marginLeft: "224px" }}
          />
        </div>
      ) : (
        ""
      )}
      <div className="ml-52">
        <Footer />
      </div>
    </div>
  )
}

export default ViewSaleTrails
