import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Saslogo from "../sidebar/logos/sasLogo2.png"
import LoggedInUser from "../sidebar/logos/userSvgLogo"
import LogoutUser from "../sidebar/logos/logout"
import Saqib from "../sidebar/logos/saqib.jpg"
import authContext from "../../context/auth/authContext"
import Sun1 from "./logos/sun1.json"
import Moon1 from "./logos/moon2.json"
import Lottie from "lottie-react"
export default function Sidebar() {

  var data=[]
  useEffect(() => {
    const storedThemeMode = localStorage.getItem("DarkTheme")
    if (storedThemeMode) {
      setdarkMode(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const { UserName } = useContext(authContext)
  // const [role, setRole] = useState("")
  // useEffect(() => {
  //   // setRole(responeFromServer.role)
 
  // }, [role])
  
  var userNameLocal = localStorage.getItem("name")
  if (userNameLocal === null) localStorage.setItem("name", UserName)
  const nameFromStorage = localStorage.getItem("name")
  const role = localStorage.getItem("userRole")

  const containsSaqib = (text) => {
    if (text) return text.toLowerCase().includes("saqib")
  }

  const authToken = localStorage.getItem("authToken")
  const [openTab, setOpenTab] = useState(null)
  // const [openInSubTab, setopenInSubTab] = useState(null)

  const [darkMode, setdarkMode] = useState(false)
  const toggleMode = () => {
    if (!darkMode) {
      setdarkMode(true)
      localStorage.setItem("DarkTheme", true)
      document.documentElement.classList.add("dark")
    } else {
      setdarkMode(false)
      document.documentElement.classList.remove("dark")
      localStorage.removeItem("DarkTheme")
    }
  }

  if (authToken === null) return null
  console.log(role&&role)
  if(role==="admin")
  {
  data = [
    {
      name: "Inventory",
      path: "/inventory",
      key: 1,
      subTabs: [
        {
          name: "View Products",
          path: "/viewProduct",
          key: 2,
        },
        {
          name: "View Vendors",
          path: "/viewVendors",
          key: 15,
        },
        {
          name: "Vender Payment Status",
          path: "/venderPaymentStatus",
          key: 17,
        },
        {
          name: "Add Product",
          path: "/addProduct",
          key: 3,
        },
        {
          name: "Add Vendor",
          path: "/addVendor",
          key: 16,
        },
      ],
    },
    {
      name: "Customers",
      path: "/customers",
      key: 4,
      subTabs: [
        {
          name: "View Customers",
          path: "/viewCustomers",
          key: 5,
        },
        {
          name: "View Sales",
          path: "/viewCustomerSale",
          key: 6,
        },
        {
          name: "Sale Payment Status",
          path: "/salePaymentStatus",
          key: 6,
        },
        {
          name: "Add Customer",
          path: "/addCustomers",
          key: 8,
        },
        {
          name: "Add Sale",
          path: "/AddCustomersSale",
          key: 9,
        },
      ],
    },
    {
      name: "Employees",
      path: "/employees",
      key: 10,
      subTabs: [
        {
          name: "Add Employees",
          path: "/addEmployee",
          key: 11,
        },
        {
          name: "Add Attendance",
          path: "/addAttendanceDate",
          key: 12,
        },
        {
          name: "View Employees",
          path: "/viewEmployee",
          key: 13,
        },
        {
          name: "View Attendance",
          path: "/attendanceDate",
          key: 14,
        },
        {
          name: "Payroll",
          path: "/payroll",
          key: 14,
        },
      ],
    },
    {
      name: "Finance",
      path: "/finance",
      key: 15,
      subTabs: [
        {
          name: "View Sales Trails",
          path: "/ViewSalesTrail",
          key: 19,
        },
        {
          name: "View Vendors Trails",
          path: "/ViewVenderTrail",
          key: 20,
        },
        {
          name: "General Ledger",
          path: "/ledger",
          key: 21,
        },
        {
          name: "Payables",
          path: "/payables",
          key: 22,
        },
        {
          name: "Receivables",
          path: "/receivables",
          key: 23,
        },
        {
          name: "Profit / Loss",
          path: "/profit",
          key: 24,
        },
        {
          name: "Profit Predictions",
          path: "/predictions",
          key: 25,
        },
        
      ],
    },
  ]}
  if(role==="cashier")
  {
  data = [  
    {
      name: "Customers",
      path: "/customers",
      key: 4,
      subTabs: [
        {
          name: "View Customers",
          path: "/viewCustomers",
          key: 5,
        },
        {
          name: "View Sales",
          path: "/viewCustomerSale",
          key: 6,
        },
        {
          name: "Sale Payment Status",
          path: "/salePaymentStatus",
          key: 6,
        },
        {
          name: "Add Customer",
          path: "/addCustomers",
          key: 8,
        },
        {
          name: "Add Sale",
          path: "/AddCustomersSale",
          key: 9,
        },
      ],
    },
    
  ]}

  if(role==="hr")
  {
   data=[ 
    {
      name: "Employees",
      path: "/employees",
      key: 10,
      subTabs: [
        {
          name: "Add Employees",
          path: "/addEmployee",
          key: 11,
        },
        {
          name: "Add Attendance",
          path: "/addAttendanceDate",
          key: 12,
        },
        {
          name: "View Employees",
          path: "/viewEmployee",
          key: 13,
        },
        {
          name: "View Attendance",
          path: "/attendanceDate",
          key: 14,
        },
        {
          name: "Payroll",
          path: "/payroll",
          key: 14,
        },
      ],
    },
   ]}

  if(role==="accountant")
  {
    data=[
      {
        name: "Finance",
        path: "/finance",
        key: 15,
        subTabs: [
          {
            name: "View Sales Trails",
            path: "/ViewSalesTrail",
            key: 19,
          },
          {
            name: "View Vendors Trails",
            path: "/ViewVenderTrail",
            key: 20,
          },
          {
            name: "General Ledger",
            path: "/ledger",
            key: 21,
          },
          {
            name: "Payables",
            path: "/payables",
            key: 22,
          },
          {
            name: "Receivables",
            path: "/receivables",
            key: 23,
          },
          {
            name: "Profit / Loss",
            path: "/profit",
            key: 24,
          },
          {
            name: "Profit Predictions",
            path: "/predictions",
            key: 25,
          },]
        }
    ]
    
  }
  if(role==="inventoryManager")
  {
    data=[
      {
        name: "Inventory",
        path: "/inventory",
        key: 1,
        subTabs: [
          {
            name: "View Products",
            path: "/viewProduct",
            key: 2,
          },
          {
            name: "View Vendors",
            path: "/viewVendors",
            key: 15,
          },
          {
            name: "Vender Payment Status",
            path: "/venderPaymentStatus",
            key: 17,
          },
          {
            name: "Add Product",
            path: "/addProduct",
            key: 3,
          },
          {
            name: "Add Vendor",
            path: "/addVendor",
            key: 16,
          },
        ],
      },
    ]
  }

  const toggleTab = (tabKey) => {
    setOpenTab(openTab === tabKey ? null : tabKey)
  }
  // const toggleInSubtab = (tabKey) => {
  //   setopenInSubTab(openInSubTab === tabKey ? null : tabKey)
  // }

  const logout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("name")
    localStorage.removeItem("userRole")
    return (window.location.href = "/signIn")
  }

  return (
    <div className="w-60 fixed dark:bg-gray-950 z-50 ">
      <div className="flex">
        <div className=" flex flex-col h-screen p-3 bg-slate-100 dark:bg-gray-950 dark:border-gray-800  text-gray shadow-xl z-[999] w-60 border border-slate-200 overflow-y-scroll no-scrollbar">
          <div className="space-y-3">
            <div className="flex items-center">
              {darkMode ? (
                <img className="ml-14 w-[6rem] py-10 filter-invert" src={Saslogo} alt="Logo" />
              ) : (
                <img className="ml-14 w-[6rem] py-10 " src={Saslogo} alt="Logo" />
              )}
              <div className="absolute mb-28">
                <div
                  className=" hover:cursor-pointer ml-40  transition-color duration-300 "
                  onClick={() => toggleMode()}
                >
                  {!darkMode ? (
                    <Lottie animationData={Sun1} loop={false} style={{ width: "100px", height: "100px" }} />
                  ) : (
                    <div className="ml-5 mb-3">
                      <Lottie animationData={Moon1} loop={false} style={{ width: "50px", height: "50px" }} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-1 ">
              <ul className="pt-2 pb-4 space-y-1 text-sm">
                
               {authToken && role==="admin" && (<Link to={"/dashboard"}>
                  <div className=" dark:bg-gray-900 dark:border-gray-800 dark:text-gray-400 rounded-lg shadow-lg pt-2 max-w-xs transition duration-300 ease-in-out hover:scale-100 text-gray-600 font-semibold cursor-pointer h-10 bg-gray-100 border border-slate-300">
                    <span to={"/dashboard"} className="pl-5 ">
                      Dashboard
                    </span>
                  </div>
                </Link>)}

                {data.map((tab) => (
                  <li key={tab.key} onClick={() => toggleTab(tab.key)}>
                    <div className="dark:bg-gray-900  dark:text-gray-400 rounded-lg shadow-lg pt-2 max-w-xs transition  ease-in-out hover:scale-100 cursor-pointer h-10 bg-gray-100 border border-slate-300 dark:border-gray-800">
                      <span className="pl-5 text-gray-600 font-semibold dark:text-gray-400">{tab.name}</span>
                    </div>
                    {tab.subTabs && openTab === tab.key && (
                      <ul className="pl-6 space-y-2 shadow text-gray-600 bg-gray-100 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-400 border rounded-md mt-1">
                        {tab.subTabs.map((subTab, index) =>{
                          
                         return (
                          <li 
                            key={subTab.key}
                            className={`${index !== 0 ? " border-t border-solid border-t-gray-500 w-40" : ""}`}
                          >
                            <Link to={subTab.path} className=" flex items-center p-2 space-x-3 rounded-md">
                              <span className=" font-semibold hover:text-black dark:hover:text-white ">
                                {subTab.name}
                              </span>
                            </Link>
                            {subTab.subTabs &&  (
                      <ul className="pl-6 space-y-2   text-gray-600 bg-gray-100 dark:bg-gray-900  dark:text-gray-400  mt-1">
                        {subTab.subTabs.map((subTab) => (
                          <li
                            key={subTab.key}
                            className="w-40"
                          >
                            <li className=" border-t border-solid border-t-gray-400 w-[8rem]" ></li>
                            <li  className=" flex items-center p-2 space-x-3 rounded-md">
                              <span className=" font-semibold hover:text-black dark:hover:text-white ">
                                {subTab.name}
                              </span>
                            </li>
                          </li>
                        ))}
                      </ul>
                    )}
                          </li>
                          
                        )})}
                        
                      </ul>
                    )}
                    
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-auto flex space-x-20">
            <div>
              {containsSaqib(userNameLocal) ? (
                <img className="w-10 h-10 rounded-full" src={Saqib} alt="Logo" />
              ) : (
                <LoggedInUser />
              )}
              <div className="">
                <div className="font-semibold text-sm dark:text-gray-400 text-gray-600 ">
                  {nameFromStorage.toUpperCase()}
                </div>
              </div>
            </div>
            <div>
              <div onClick={logout} className="cursor-pointer flex pt-10 space-x-2 absolute left-[9rem]">
                <div className="font-semibold text-sm dark:text-gray-400 text-gray-600 ">LOGOUT</div>
                <div>
                  <LogoutUser />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
