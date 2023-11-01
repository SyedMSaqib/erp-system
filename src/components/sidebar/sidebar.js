import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Saslogo from '../sidebar/logos/sasLogo2.png';

export default function Sidebar() {
  const Navigate = useNavigate();
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
    <div className="w-60 fixed">
      <div className="flex">
        <div className="shadow-lg flex flex-col h-screen p-3 bg-slate-300 shadow w-60">
          <div className="space-y-3">
            <div className="flex items-center">
              <img className="ml-16 w-28" src={Saslogo} alt="Logo" />
            </div>
            <div className="flex-1">
              <ul className="pt-2 pb-4 space-y-1 text-sm">
                {data.map((tab) => (
                  <li
                    key={tab.key}
                    onClick={() => toggleTab(tab.key)}
                    className="rounded-sm shadow-lg pt-2 max-w-xs transition duration-300 ease-in-out hover:scale-110 cursor-pointer"
                  >
                    <div className="flex items-center p-2 space-x-3 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                      <span>{tab.name}</span>
                    </div>
                    {tab.subTabs && openTab === tab.key && (
                      <ul className="pl-6 space-y-2">
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
          {/* Logout button */}
          <div
            onClick={logout}
            className="flex items-center p-2 space-x-3 rounded-md cursor-pointer mt-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
}
