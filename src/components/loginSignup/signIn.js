import React, { useContext, useEffect, useState } from "react"
import authContext from "../../context/auth/authContext"
import { Link, useNavigate } from "react-router-dom"
import validator from "validator"
import BgImg from "../photos/loginBg.jpg"
import toast from "react-hot-toast"
import SasLogo from "../sidebar/logos/sasLogo2.png"
import Footer from "../loginSignup/footer"

const SignIn = ({ settokenUpdate }) => {
  var authToken = null
  const { email, setEmail, password, setPassword, login, responeFromServer, credentialMatchFail } =
    useContext(authContext)
  const [value, setvalue] = useState(true)
  const [validateEmail, setvalidateEmail] = useState(true)
  const [validatePassword, setvalidatePassword] = useState(true)
  const [border, setborder] = useState("border-gray-300")
  const [borderEmail, setborderEmail] = useState("border-gray-300")
  const navigate = useNavigate()

  const roles = ["Admin", "Sales Manager", "Inventory Manager", "Accountant", "HR"]
  const [Role, setRole] = useState("admin")
  const handleRole = (e) => {
    setRole(e.target.value)
  }

  const role = localStorage.getItem("userRole")

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "email") {
      setEmail(value)
    } else if (name === "password") {
      setPassword(value)
    }
  }

  useEffect(() => {
    if (credentialMatchFail && credentialMatchFail.status === 401) {
      toast(
        <span>
          <span className="font-bold">Authentication :</span> Password Mismatch
        </span>,
        {
          icon: "❌",
        }
      )
    } else if (credentialMatchFail && credentialMatchFail.status === 400) {
      toast.error(
        <span>
          <span className="font-bold">Authentication:</span> Email Mismatch
        </span>,
        {
          icon: "❌",
        }
      )
    }
    else if (credentialMatchFail && credentialMatchFail.status === 405) {
      toast.error(
        <span>
          <span className="font-bold">Authentication:</span> Role does not exist against this email, contact admin for more info.
        </span>,
        {
          icon: "⚠️",
        }
      )
    }
    else if (credentialMatchFail && credentialMatchFail.status === 408) {
      toast.error(
        <span>
          <span className="font-bold">Authentication:</span>User access denied!
        </span>,
        {
          icon: "⚠️",
        }
      )
    }
  }, [credentialMatchFail])

  useEffect(() => {
    if (responeFromServer.ok) {
      setvalue(false)
    }
  }, [login])
  const checkAuth = async () => {
    if (validator.isEmail(email)) {
      setvalidateEmail(true)
      setborderEmail("border-gray-300")
      if (validator.isLength(password, { min: 8 })) {
        setborder("border-gray-300")
        setvalidatePassword(true)
        checkLogin()
      } else {
        setvalidatePassword(false)
        toast.error("Enter Valid password")
        setborder("border-red-600")
      }
    } else {
      toast.error("Enter Valid Email")
      setvalidateEmail(false)
      setborderEmail("border-red-600")
    }
  }
  const checkLogin = async () => {
    await login(email, password, Role)

    authToken = localStorage.getItem("authToken")
    if (authToken !== null) {
      console.log(authToken)

      settokenUpdate(true)
      toast.success("Login Succcess")
    }
  }

  const onClick = async (event) => {
    event.preventDefault()
    checkAuth()
  }

  const AuthToken = localStorage.getItem("authToken")
  if (AuthToken !== null || value === false) {
    if (role === "admin") {
      navigate("/dashboard")
    }
    return null
  } else
    return (
      <div
        className="flex justify-center items-center w-screen h-screen bg-cover"
        style={{ backgroundImage: `url(${BgImg})` }}
      >
        <section className="mb-10">
          <div>
            <div className="w-full bg-gray-50  rounded-lg shadow-md md:mt-0 sm:max-w-md xl:p-0">
              <div className=" p-8  ">
                <div className=" flex justify-center ">
                  <img className="w-24" src={SasLogo} alt="Logo" />
                </div>

                <h1 className="flex justify-center font-mono  text-sm  leading-tight tracking-tight text-gray-900 md:text-xl">
                  SIGN IN
                </h1>
                <form className="space-y-2  w-60 ">
                  <div>
                    {validateEmail === false ? (
                      <span className="text-red-700 block mb-2 text-sm font-medium">Enter valid email!</span>
                    ) : !validatePassword ? (
                      <span className="text-red-700 block mb-2 text-sm font-medium">Password must be 8 character!</span>
                    ) : (
                      ""
                    )}
                    <label htmlFor="email" className="block  text-sm font-medium text-gray-900">
                      Your email
                    </label>
                    <input
                      onChange={handleChange}
                      type="email"
                      name="email"
                      id="email"
                      className={`bg-gray-100 border ${borderEmail} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      placeholder="name@company.com"
                      required=""
                    />
                  </div>
                  <div>
                    <label className=" text-sm font-medium text-gray-700 w-24 dark:text-gray-400 pt-2">Role:</label>
                    <select
                      id="roles"
                      name="roles"
                      class="bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={handleRole}
                      value={Role}
                    >
                      {roles.map((roles) => (
                        <option key={roles} value={roles}>
                          {roles}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="password" className="block  text-sm font-medium text-gray-900">
                      Password
                    </label>
                    <input
                      onChange={handleChange}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className={`bg-gray-100 border ${border} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      required=""
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center ">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4  border border-gray-300 rounded bg-gray-100 focus:ring-3 focus:ring-primary-300"
                          required=""
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="remember" className="text-gray-500">
                          Remember me
                        </label>
                      </div>
                    </div>
                  </div>
                  <Link
                    onClick={onClick}
                    type="submit"
                    className="w-full text-black bg-slate-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-40"
                  >
                    Sign in
                  </Link>
                  <div className="text-sm font-light text-gray-500">
                    Don’t have an account yet?{" "}
                    <Link to={"/signUp"} className="font-medium text-primary-600 hover:underline">
                      Sign up
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <div className="fixed bottom-0 ">
          <Footer />
        </div>
      </div>
    )
}

export default SignIn
