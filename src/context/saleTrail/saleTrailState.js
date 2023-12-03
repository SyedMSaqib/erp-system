import SaleTrailContext from "./saleTrailContext"
import config from "../../config"
import { useState } from "react"

const SaleTrailState = (props) => {
  const host = config.apiurl
  const authToken = localStorage.getItem("authToken")
  const [saleTrails, setsaleTrails] = useState(null)
  const [saleTrailsSearch, setsaleTrailsSearch] = useState([])

  const getAllSaleTrails = async () => {
    const response = await fetch(`${host}/saleTrail/fetchAllSaleTrails`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    })
    const data = await response.json()
    setsaleTrails(data)
    setsaleTrailsSearch(data)
  }

  const updateSaleTrail = async (id) => {
    await fetch(`${host}/saleTrail/addSaleTrail/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    })
  }

  return (
    <SaleTrailContext.Provider
      value={{
        saleTrails,
        getAllSaleTrails,
        updateSaleTrail,
        saleTrailsSearch,
        setsaleTrailsSearch,
        setsaleTrails
      }}
    >
      {props.children}
    </SaleTrailContext.Provider>
  )
}
export default SaleTrailState
