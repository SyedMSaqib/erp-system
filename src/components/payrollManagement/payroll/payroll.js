import React from 'react'
import MonthDropdown from '../monthDropdown/monthDropdown'

const Payroll = () => {
  return (
    <div className="dark:bg-gray-900 bg-slate-50 ">
    <div className="flex justify-center items-center   ">
     <div className="rounded-lg flex justify-start border border-gray-300 shadow-xl w-[60rem] h-[6rem] mt-9 ml-56">
        <div className="pl-40 pt-4">
            
<MonthDropdown/>     
            </div>  
     
     </div>
    </div>
    </div>
  )
}

export default Payroll
