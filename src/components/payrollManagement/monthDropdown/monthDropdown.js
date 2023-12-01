import React, { useContext, useState } from "react"
import SalaryContext from "../../../context/salary/salaryContext"

const MonthDropdown = () => {
  const { Days, setDays,Month, setMonth,isChecked, setIsChecked} = useContext(SalaryContext)
    const [firstDay, setFirstDay] = useState("");
  const [lastDay, setLastDay] = useState("");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const handleChange = (e) => {
    getFirstAndLastDay(e.target.value);
    setMonth(e.target.value);
    console.log(Days)
  };

  const getFirstAndLastDay = (selectedMonth) => {
    const date = new Date(`${selectedMonth} 1, 2023`)
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    setDays(lastDay.getDate())

    const offset = new Date().getTimezoneOffset()
    firstDay.setMinutes(firstDay.getMinutes() - offset)
    lastDay.setMinutes(lastDay.getMinutes() - offset)
    
      setFirstDay( firstDay.toISOString().slice(0, 10))
      setLastDay(lastDay.toISOString().slice(0, 10))
    }


  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }
  
  
  return (
    <div className="flex">
      <div className="mt-4 flex pr-4">
        <label htmlFor="month" className=" text-sm font-medium text-gray-700 w-24 dark:text-gray-400 pt-2">
          Month:
        </label>
        <select
          id="month"
          name="month"
          class="bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleChange}
          value={Month}
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        


      </div>
      <div className="mt-5">
      <label className=' relative inline-flex cursor-pointer select-none items-center'>
        <input
          type='checkbox'
          checked={isChecked}
          onChange={handleCheckboxChange}
          className='sr-only'
        />
        <span className='label flex items-center text-sm font-medium text-black dark:text-gray-300'>
          Filter by days Present
        </span>
        <span
          className={`slider mx-4 flex h-6 w-[40px] items-center rounded-full p-1 duration-200 ${
            isChecked ? 'bg-green-400' : 'bg-red-200'
          }`}
        >
          <span
            className={`dot h-4 w-4 rounded-full   duration-200 ${
              isChecked ? 'bg-green-700 translate-x-[18px] ' : 'bg-red-500'
            }`}
          ></span>
        </span>
       
      </label>
    </div>
      
      <div className="mt-6 flex">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-400 ml-5 w-[7rem]  ">Selected Month:</p>
        <p className="text-sm   dark:text-gray-300">{Month}</p>
        <p className="text-sm font-medium pl-10 dark:text-gray-400 ">Start:</p>
        <p className="text-sm  dark:text-gray-300 w-[5rem] pl-1 ">{firstDay}</p>
        <p className="text-sm font-medium pl-10 dark:text-gray-400">End:</p>
        <p className="text-sm   dark:text-gray-300 w-[5rem] pl-1 ">{lastDay}</p>
      </div>
      
    </div>
  )
}

export default MonthDropdown
