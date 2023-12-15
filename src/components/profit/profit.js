import React, { useContext } from 'react';
import ProfitChart from './profitChart';
import MonthDropdown from './monthDropdown';
import profitContext from "../../context/profit/profitContext";

const Profit = () => {
  const { profit, Month } = useContext(profitContext);

  return (
    <div className='flex flex-col items-center dark:bg-gray-900 bg-slate-50'>
      <div className="z-40 shadow-md w-screen h-[6rem] bg-slate-100 bg-opacity-5 backdrop-blur-md dark:bg-gray-950 dark:bg-opacity-5 dark:backdrop-blur-md fixed">
        <div className="flex justify-center items-center pt-2">
          <MonthDropdown />
        </div>
      </div>
      <div className="text-center mt-[7rem] ml-[10rem]  font-semibold text-lg dark:text-gray-300">Sales Profit</div>
      <div className='flex justify-center mt-5 ml-[10rem]'>
        <ProfitChart />
      </div>
      <div className="shadow-lg m-5 ml-[14rem]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:border-gray-700 dark:text-gray-400 border border-gray-300 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 border-2">
                Month
              </th>
              <th scope="col" className="px-10 py-3 border-2">
                Total Transactions
              </th>
              <th scope="col" className="px-10 py-3 border-2">
                Total Sales (Cleared)
              </th>
              {profit.profit > 0 ? (
                <th scope="col" className="px-20 py-3 border-2">
                  Total Profit (Sales-(Purchases+Expenses))
                </th>
              ) : (
                <th scope="col" className="px-20 py-3 border-2">
                  Total Loss (Sales-(Purchases+Expenses))
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              {profit && <td className="px-6 py-4 font-semibold border-2">{Month}</td>}
              {profit && <td className="px-12 py-4 font-semibold border-2">{profit.totalTransaction}</td>}
              {profit && <td className="px-12 py-4 font-semibold border-2">{profit.totalSales}</td>}
              {profit && profit.profit > 0 ? (
                <td className="px-40 py-4 font-semibold border-l">
                  {Math.abs(profit.profit).toFixed(0)} Rs
                </td>
              ) : (
                <td className="px-40 py-4 font-semibold text-red-600 border-l">(
                  {Math.abs(profit.profit).toFixed(0)}) Rs
                </td>
              )}
            </tr>
          
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profit;
