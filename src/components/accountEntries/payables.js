import React, { useContext, useEffect } from "react";
import EntriesContext from "../../context/accountEntries/EntriesContext";

const Payables = () => {
  const { payables, getAllPayables } = useContext(EntriesContext);
  var totalAmount=0
  useEffect(() => {
    getAllPayables();
  }, []);
  const formatMongoDate = (mongoDate) => {
    const dateObject = new Date(mongoDate)

    const year = dateObject.getFullYear()
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0")
    const day = dateObject.getDate().toString().padStart(2, "0")
    const hours = dateObject.getHours().toString().padStart(2, "0")
    const minutes = dateObject.getMinutes().toString().padStart(2, "0")

    return `${year}-${month}-${day} ${hours}:${minutes}`
  }
  
  return (
    <div className="dark:bg-gray-900">
    <div className="flex justify-center items-center  ">
      <div className="absolute top-0 text-center ml-52 mt-2 font-semibold text-lg dark:text-gray-300"> Payables</div>
      <div className="overflow-auto shadow-lg  m-5 mt-10 ml-64 ">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:border-gray-700 dark:text-gray-400 border border-gray-300">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Journal Entry
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
           
            <th scope="col" className="px-6 py-3">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {payables.map((entry) => {
            totalAmount+=entry.amount
            return(
            <tr key={entry._id} className={`${entry.journalEntry==="rr"?"bg-red-200 border-b dark:text-gray-600 text-gray-600 border-gray-300":entry.journalEntry==="dr"?"bg-green-200 border-b dark:text-gray-600 text-gray-600 border-gray-300":entry.journalEntry==="cr"?"bg-yellow-200 border-b dark:text-gray-600 text-gray-600 border-gray-300":""}`}>
              <td className="px-6 py-4">{(entry.journalEntry).toUpperCase()}</td>
              <td className="px-20 py-4">{entry.journalEntry==="dr"?entry.Description+" (Vender A/c)":entry.Description}</td>
              {entry.amount>0? <td className="px-20 py-4">{Math.abs(entry.amount)}</td>:<td className="px-20 py-4">({Math.abs(entry.amount)})</td>}
           
              <td className="px-20 py-4">{formatMongoDate(entry.date)}</td>
            </tr>
          )})}
           <tr  className="bg-gray-200 border-b dark:text-gray-600 text-gray-600 border-gray-300">
              <td className="px-6 py-4"></td>
              <td className="px-20 py-4"></td>
              <td className="px-20 py-4 font-semibold">Payable:</td>
        
              <td className="px-20 py-4 font-semibold">{Math.abs(totalAmount)}</td>

            </tr>
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
};

export default Payables;
