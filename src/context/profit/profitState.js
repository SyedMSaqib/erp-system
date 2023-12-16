import React, { useState } from "react"
import profitContext from "./profitContext"
import config from "../../config"

const ProfitState = (props) => {
  const host = config.apiurl
  const [profit, setprofit] = useState("")
  const authToken = localStorage.getItem("authToken")
  const [Days, setDays] = useState("")
  const [Month, setMonth] = useState("January")
  const [predictions, setPredictions] = useState("")

  const getProfit = async () => {
    const response = await fetch(`${host}/revenue/profit/:${Month}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    })
    const data = await response.json()
    setprofit(data)
  }
  const getProfitForecast = async () => {
    const response = await fetch(`${host}/prophet/predictions`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    })
    const data = await response.json()
    setPredictions(data)
  }

  return (
    <profitContext.Provider
      value={{
        getProfit,
        profit,
        Days,
        setDays,
        Month,
        setMonth,
        predictions, 
        setPredictions,
        getProfitForecast
      }}
    >
      {props.children}
    </profitContext.Provider>
  )
}

export default ProfitState
