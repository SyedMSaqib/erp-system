import React, {  useState } from "react"
import AuthContext from "./authContext"

const AuthState = (props) => {
  const host = "http://localhost:5000"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [responeFromServer, setresponeFromServer] = useState("")
  const [responeFromServerSignUp, setresponeFromServerSignUp] = useState("")
  const [UserName, setUserName] = useState("")
  const [SignUpPopUpVisible, setSignUpPopUpVisible] = useState(false)

  const login = async (email, password) => {
    try {
      const response = await fetch(`${host}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
      const responseBody = await response.json();
        setresponeFromServer(responseBody)
        const token = responseBody.token
        setUserName(responseBody.name)
        localStorage.setItem("authToken", token)
      
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
        signup,
        responeFromServer,
        setName,
        name,
        responeFromServerSignUp,
        UserName,
        SignUpPopUpVisible,
        setSignUpPopUpVisible,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState
