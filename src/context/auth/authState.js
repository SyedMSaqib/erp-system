import React, {  useState } from "react"
import AuthContext from "./authContext"
import config from '../../config';

const AuthState = (props) => {
  const host=config.apiurl

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [responeFromServer, setresponeFromServer] = useState("")
  const [responeFromServerSignUp, setresponeFromServerSignUp] = useState("")
  const [UserName, setUserName] = useState("")
  const [SignUpPopUpVisible, setSignUpPopUpVisible] = useState(false)
  const [credentialMatchFail, setcredentialMatchFail] = useState(null)


  const login = async (email, password) => {
    try {
      const response = await fetch(`${host}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
      if (response.ok) {
        setresponeFromServer(response)
        const data = await response.json()
        const token = data.token
        setUserName(data.name)
        const role=data.role
        localStorage.setItem("authToken", token)
        localStorage.setItem("userRole", role)
      } else {
        const responseBody = await response.json();
        setcredentialMatchFail(responseBody)

      }
    } catch (error) {
      console.error("Login failed:", error)
      
    }
  }

 const signup = async (email, password, name) => {
  try {
    const response = await fetch(`${host}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });
    const responseBody = await response.json();
      setresponeFromServerSignUp(responseBody);
   
  } catch (error) {
    console.error("Signup failed:", error);
  }
};

  return (
    <AuthContext.Provider
      value={{
        email,
        password,
        login,
        signup,
        setEmail,
        setPassword,
        responeFromServer,
        setName,
        name,
        responeFromServerSignUp,
        UserName,
        SignUpPopUpVisible,
        setSignUpPopUpVisible,
        credentialMatchFail,
       
        
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState
