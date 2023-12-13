import React from 'react'
import ProfitChart from './profitChart'
import MonthDropdown from './monthDropdown'

const Profit = () => {
  return (
    <div className='flex justify-center '>
       <div className=" z-40 shadow-md w-screen h-[6rem]   bg-slate-100 bg-opacity-5 backdrop-blur-md   dark:bg-gray-950 dark:bg-opacity-5 dark:backdrop-blur-md fixed ">
          <div className="flex justify-center items-center pt-2 pl-56">
            <MonthDropdown />
          </div>
        </div>
           <div className="absolute top-0 text-center ml-52 mt-[7rem] font-semibold text-lg dark:text-gray-300">Sales Profit</div>
        <div className='flex justify-center ml-[10rem] mt-[10rem]'>
          <ProfitChart/>
        </div>
    </div>
  )
}

export default Profit
