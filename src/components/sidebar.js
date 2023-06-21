import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Saslogo from '../logos/sasLogo2.png'
export default function Sidebar() {

    const data=[{
        name:"View Products",
        path:"/viewProduct",
        key:1
    },
    {
        name:"Add Products",
        path:"/addProduct",
        key:2
    }
]
     const [open, setopen] = useState(false)
     const click=()=>{
        if(open==false)
        setopen(true)
        else if(open==true)
        setopen(false)
    
     }

    return (
      <div className='w-60 fixed '>
        <div className="flex  ">
            <div className="shadow-lg  flex flex-col h-screen p-3 bg-slate-300 shadow w-60">
                <div className="space-y-3">
                    <div className="flex items-center">
                        <img className='ml-16 w-28' src={Saslogo}></img>
                    </div>
                    <div className="flex-1">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                            
                            
                            <li onClick={click} className="rounded-sm shadow-lg pt-2 max-w-xs transition duration-300 ease-in-out hover:scale-110">
                                <a
                                    
                                    className="flex items-center p-2 space-x-3 rounded-md cursor-pointer "
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
                                    <span >Inventory</span>
                                   
  

                                </a>
                            </li>
                            {open  && ( 
                            
                                   
                            <span>{data.map((data)=>(
                                <li className="rounded-sm ">

                                    <Link
                                    to={data.path}
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <span className='pl-9 text-xs font-bold' key={data.key}>{data.name}</span>
                                   
  

                                </Link>

                                </li>
                            ))}</span>
                        )}
                            <li className="rounded-sm shadow-lg pt-2 max-w-xs transition duration-300 ease-in-out hover:scale-110">
                                <Link
                                    to="/product"
                                    className="flex items-center p-2 space-x-3 rounded-md"
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
                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <span>Settings</span>
                                </Link>
                            </li>
                            <li className="rounded-sm">
                                <a
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
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
                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </div>
              
                </div>
                
            </div>
            
            </div>
            </div>
                );
}
