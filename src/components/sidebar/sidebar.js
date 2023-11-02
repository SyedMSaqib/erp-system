import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Saslogo from '../sidebar/logos/sasLogo2.png';
import LoggedInUser from '../sidebar/logos/userSvgLogo';
import authContext from '../../context/auth/authContext';


export default function Sidebar() {
  const {UserName}=useContext(authContext)
  const authToken = localStorage.getItem('authToken');
  const [openTab, setOpenTab] = useState(null);

  if (authToken === null) return null;

  const data = [
    {
      name: 'Inventory',
      path: '/inventory',
      key: 1,
      subTabs: [
        {
          name: 'View Products',
          path: '/viewProduct',
          key: 2,
        },
        {
          name: 'Add Product',
          path: '/addProduct',
          key: 5,
        },
      ],
    },
    {
      name: 'Customers',
      path: '/customers',
      key: 3,
      subTabs: [
        {
          name: 'View Customers',
          path: '/viewCustomers',
          key: 4,
        },
        {
          name: 'View Sales',
          path: '/viewCustomerSale',
          key: 11,
        },
        {
          name: 'Add Customer',
          path: '/addCustomers',
          key: 6,
        },
        {
          name: 'Add Sale',
          path: '/AddCustomersSale',
          key: 10,
        },
      ],
    },
    {
      name: 'Employees',
      path: '/employees',
      key: 7,
      subTabs: [
        {
          name: 'Add Employees',
          path: '/addEmployee',
          key: 9,
        },
        {
          name: 'Add Attendance',
          path: '/addAttendanceDate',
          key: 13,
        },
        {
          name: 'View Employees',
          path: '/viewEmployee',
          key: 8,
        },
        {
          name: 'View Attendance',
          path: '/attendanceDate',
          key: 12,
        },
      ],
    },
    
  ];

  const toggleTab = (tabKey) => {
    setOpenTab(openTab === tabKey ? null : tabKey);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    return window.location.href = '/signIn';
  };

  return (
    <div className="w-60 fixed ">
      <div className="flex">
        <div className=" flex flex-col h-screen p-3 lg:bg-white  text-gray shadow-xl z-[999] w-60 " >
          <div className="space-y-3">
            <div className="flex items-center">
              <img className="ml-10 w-36 py-10" src={Saslogo} alt="Logo" />
            </div>
            
            <div className='pr-14 text-gray-600  flex justify-center '>
          <div className=''><LoggedInUser/></div>
            
          <div className='py-6 text-xs '>Logged In: <span className='font-bold'>{UserName.toUpperCase()}</span></div>
          </div>

            <div className="flex-1 ">
              <ul className="pt-2 pb-4 space-y-1 text-sm">
                {data.map((tab) => (
                  <li
                    key={tab.key}
                    onClick={() => toggleTab(tab.key)}
                    
                  >
                    <div className="rounded-sm shadow-lg pt-2 max-w-xs transition duration-300 ease-in-out hover:scale-110 cursor-pointer h-10 bg-slate-50">
                      <span className='pl-5 ' >{tab.name}</span>
                    </div>
                    {tab.subTabs && openTab === tab.key && (
                      <ul className="pl-6 space-y-2 shadow bg-slate-50 ">
                        {/* <span className='divide-y-[1px] divide-gray-500 divide-opacity-40'></span> */}
                        {tab.subTabs.map((subTab) => (
                          <li key={subTab.key}>
                            <Link
                              to={subTab.path}
                              className="flex items-center p-2 space-x-3 rounded-md"
                            >
                              <span className="pl-9 text-xs font-bold">
                                {subTab.name}
                              </span>
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
         
          
          <div
            onClick={logout}
            className="flex justify-center space-x-3 rounded-md cursor-pointer mt-auto "
            >
            <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-black white:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white white:bg-gray-900 rounded-md group-hover:bg-opacity-0 ">
      logout
  </span>
</button>
            
          </div>
            </div>

        
      </div>
    </div>
  );
}
