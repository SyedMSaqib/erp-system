import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Saslogo from "../sidebar/logos/sasLogo2.png"
import LoggedInUser from "../sidebar/logos/userSvgLogo"
import LogoutUser from "../sidebar/logos/logout"
import Saqib from "../sidebar/logos/saqib.jpg"
import authContext from "../../context/auth/authContext"
import Sun from "./logos/sun"
import Moon from "./logos/Moon"

export default function Sidebar() {
  const { UserName } = useContext(authContext)
  var userNameLocal = localStorage.getItem("name")
  if (userNameLocal === null) localStorage.setItem("name", UserName)
  const nameFromStorage = localStorage.getItem("name")

  const containsSaqib = (text) => {
    if (text) return text.toLowerCase().includes("saqib")
  }

  const authToken = localStorage.getItem("authToken")
  const [openTab, setOpenTab] = useState(null)

  const [darkMode, setdarkMode] = useState(false)
  const toggleMode=()=>
  {
    if(darkMode===false)
  {  setdarkMode(true)
    document.documentElement.classList.add('dark')
  }
  else{
  setdarkMode(false)
  document.documentElement.classList.remove('dark')
  }
  }

  if (authToken === null) return null

  const data = [
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
          name: "Add Product",
          path: "/addProduct",
          key: 5,
        },
      ],
    },
    {
      name: "Customers",
      path: "/customers",
      key: 3,
      subTabs: [
        {
          name: "View Customers",
          path: "/viewCustomers",
          key: 4,
        },
        {
          name: "View Sales",
          path: "/viewCustomerSale",
          key: 11,
        },
        {
          name: "Add Customer",
          path: "/addCustomers",
          key: 6,
        },
        {
          name: "Add Sale",
          path: "/AddCustomersSale",
          key: 10,
        },
      ],
    },
    {
      name: "Employees",
      path: "/employees",
      key: 7,
      subTabs: [
        {
          name: "Add Employees",
          path: "/addEmployee",
          key: 9,
        },
        {
          name: "Add Attendance",
          path: "/addAttendanceDate",
          key: 13,
        },
        {
          name: "View Employees",
          path: "/viewEmployee",
          key: 8,
        },
        {
          name: "View Attendance",
          path: "/attendanceDate",
          key: 12,
        },
      ],
    },
  ]

  const toggleTab = (tabKey) => {
    setOpenTab(openTab === tabKey ? null : tabKey)
  }

  const logout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("name")
    return (window.location.href = "/signIn")
  }

  return (
    <div className="w-60 fixed dark:bg-gray-900 ">
      <div className="flex">
        <div className=" flex flex-col h-screen p-3 bg-slate-100 dark:bg-gray-900 dark:border-gray-800  text-gray shadow-xl z-[999] w-60 border border-slate-200">
          <div className="space-y-3">
            <div className="flex items-center">
              <img className="ml-10 w-36 py-10" src={Saslogo} alt="Logo" />
            </div>
            
            <button className="w-8 hover:cursor-pointer" onClick={()=>toggleMode()}>
             {!darkMode?<Sun/>:
            <Moon/>}
            </button>
            <div className="flex-1 ">
              <ul className="pt-2 pb-4 space-y-1 text-sm">
                <Link to={"/dashboard"}>
                  <div className=" dark:bg-gray-900 dark:border-gray-800 dark:text-gray-400 rounded-lg shadow-lg pt-2 max-w-xs transition duration-300 ease-in-out hover:scale-100 text-gray-600 font-semibold cursor-pointer h-10 bg-gray-100 border border-slate-300">
                    <span to={"/dashboard"} className="pl-5 ">
                      Dashboard
                    </span>
                  </div>
                </Link>

                {data.map((tab) => (
                  <li key={tab.key} onClick={() => toggleTab(tab.key)}>
                    <div className="dark:bg-gray-900  dark:text-gray-400 rounded-lg shadow-lg pt-2 max-w-xs transition  ease-in-out hover:scale-100 cursor-pointer h-10 bg-gray-100 border border-slate-300 dark:border-gray-800 ">
                      <span className="pl-5 text-gray-600 font-semibold dark:text-gray-400">{tab.name}</span>
                    </div>
                    {tab.subTabs && openTab === tab.key && (
                      <ul className="pl-6 space-y-2 shadow text-gray-600 bg-gray-100 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-400 border">
                        {tab.subTabs.map((subTab, index) => (
                          <li key={subTab.key} className={`${index !== 0 ? " border-t border-solid w-40" : ""}`}>
                            <Link to={subTab.path} className=" flex items-center p-2 space-x-3 rounded-md">
                              <span className=" font-semibold hover:text-black dark:hover:text-white ">{subTab.name}</span>
                              
                            </Link>
                          </li>
                        ))}
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
                <div className="font-semibold text-sm text-gray-600 ">{nameFromStorage.toUpperCase()}</div>
              </div>
            </div>
            <div>
              <div onClick={logout} className="cursor-pointer flex pt-10 space-x-2">
                <div className="font-semibold text-sm text-gray-600 ">LOGOUT</div>
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
