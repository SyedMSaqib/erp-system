import React from "react"
import RolesContext from "./rolesContext"
import config from "../../config"
import { useState } from "react"

const RolesState = (props) => {
  const host = config.apiurl
  const authToken = localStorage.getItem("authToken")
  const [Roles, setRoles] = useState(null)

  const getAllRoles = async () => {
    const response = await fetch(`${host}/roles/getRoles`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    })
    const data = await response.json()
    setRoles(data)
  }
  const createRole = async (role, email, password) => {
    const response = await fetch(`${host}/roles/createRole`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify({
        role,
        email,
        password,
      }),
    })
  }
  const deleteRole = async (id) => {
    const response = await fetch(`${host}/roles/deleteRole/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    })
  }

  return (
    <RolesContext.Provider
      value={{
        deleteRole,
        createRole,
        Roles,
        getAllRoles,
      }}
    >
      {props.children}
    </RolesContext.Provider>
  )
}

export default RolesState
