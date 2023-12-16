import React, { useContext, useEffect } from "react"
import profitContext from "../../context/profit/profitContext"
import PredictionsChart from "./predictionsChart"

const ProfitPredictions = () => {
  const { predictions, getProfitForecast } = useContext(profitContext)
  useEffect(() => {
    getProfitForecast()
  }, [])
  console.log(predictions)
  return (
    <div className="flex flex-col items-center dark:bg-gray-900 bg-slate-50">
      <div className="text-center  ml-[10rem]  font-semibold text-lg dark:text-gray-300">Profit Predictions</div>
      <div className="flex justify-center mt-5 ml-[10rem]">
        <PredictionsChart />
      </div>
      <div className="shadow-lg m-5 ml-[14rem]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:border-gray-700 dark:text-gray-400 border border-gray-300 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-52 py-3 border-2">
                Date
              </th>
              <th scope="col" className="px-32 py-3 border-2">
                Predicitons
              </th>
            </tr>
          </thead>
       
            <tbody>
              {predictions &&
                predictions.predictions &&
                predictions.predictions.map((prediction) => (
                  <tr key={prediction.ds} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-semibold border-2">{prediction.ds}</td>
                    <td className="px-32 py-4 font-semibold border-2">{Math.abs(prediction.yhat).toFixed(0)}</td>
                  </tr>
                ))}
          
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProfitPredictions
