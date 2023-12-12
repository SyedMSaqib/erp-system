import React from 'react'
import ProfitChart from './profitChart'

const Profit = () => {
  return (
    <div className='flex justify-center '>
           <div className="absolute top-0 text-center ml-52 mt-2 font-semibold text-lg dark:text-gray-300">Profit</div>
        <div className='flex justify-center ml-[10rem] mt-[5rem]'>
          <ProfitChart/>
        </div>
    </div>
  )
}

export default Profit
