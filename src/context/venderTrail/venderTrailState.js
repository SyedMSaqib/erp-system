import React, { useState } from "react"
import VenderTrailContext from "./venderTrailContext"
import config from "../../config"

const VenderTrailState = (props) => {
  const host = config.apiurl
  const authToken = localStorage.getItem("authToken")
  const [venderTrails, setVenderTrails] = useState()
  const [venderTrailsSearch, setvenderTrailsSearch] = useState("")

  const getAllVenderTrails = async () => {
    try {
      const response = await fetch(`${host}/venderTrail/fetchAllVenderTrails`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      })

      const data = await response.json()
      setVenderTrails(data)
      setvenderTrailsSearch(data)
    } catch (error) {
      console.error("Error fetching vender trails:", error)
    }
  }

  const updateVenderTrail = async (id) => {
    try {
      await fetch(`${host}/venderTrail/addVenderTrail/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      })
    } catch (error) {
      console.error("Error updating vender trail:", error)
    }
  }

  return (
    <VenderTrailContext.Provider
      value={{
        venderTrails,
        getAllVenderTrails,
        updateVenderTrail,
        setVenderTrails,
        venderTrailsSearch,
        setvenderTrailsSearch,
      }}
    >
      {props.children}
    </VenderTrailContext.Provider>
  )
}

export default VenderTrailState
