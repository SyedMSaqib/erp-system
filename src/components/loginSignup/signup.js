import React, { useContext, useState, useEffect } from "react"
import authContext from "../../context/auth/authContext"
import validator from "validator"
import BgImg from '../photos/loginBg.jpg'
import toast  from 'react-hot-toast';
import SasLogo from '../sidebar/logos/sasLogo2.png'
import Footer from '../loginSignup/footer'


const SignUp = () => {
  const { email, setEmail, password, setPassword, signup, setName, name, responeFromServerSignUp } =
    useContext(authContext)
  const [validation, setvalidation] = useState("")
  const [validateEmail, setvalidateEmail] = useState(false)
  const [validatePassword, setvalidatePassword] = useState(false)
  const [validateName, setvalidateName] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "email") {
      setEmail(value)
    } else if (name === "password") {
      setPassword(value)
    } else if (name === "name") {
      setName(value)
    }
  }
  const signUp = async () => {
    try {
      await signup(email, password, name)
      toast.success("Account Created Successfully.")
      return (window.location.href = "/signIn")
    } catch (error) {
      console.error("Error during signup:", error)
    }
  }

  const checkSignUp = async () => {
    if (validator.isEmail(email)) {
      setvalidateEmail(true)
    } else {
      setvalidation("email")
      setvalidatePassword(false)
      setvalidateName(false)
    }
    if (validator.isLength(password, { min: 8 })) {
      setvalidatePassword(true)
    } else {
      setvalidation("password")
      setvalidateEmail(false)
      setvalidateName(false)
    }
    if (validator.isLength(name, { min: 1 })) {
      setvalidateName(true)
    } else {
      setvalidation("name")
      setvalidateEmail(false)
      setvalidatePassword(false)
    }
  
  }
  useEffect(() => {
    if (validateEmail && validatePassword && validateName) {
      signUp()
    }
  }, [validateEmail, validatePassword, validateName])

  const onClick = async (event) => {
    event.preventDefault()
    await checkSignUp()
    console.log(validateEmail + " " + validatePassword)
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-cover" style={{ backgroundImage: `url(${BgImg})` }} >
      <section className="">
      
        <div className="max-w-md w-full">
          
          <div className="bg-white   rounded-lg shadow-md p-6 md:p-8">
          <div className=' flex justify-center'>

         <img className="w-24" src={SasLogo} alt="Logo" />
          </div>
          
          <h1 className="flex justify-center font-mono  text-sm  py-6 leading-tight tracking-tight text-gray-900 md:text-xl">
            SIGN UP
          </h1>
            <div className="mb-4">
              {validation === "email" ? (
                <span className="text-red-700 block mb-2 text-sm font-medium">Enter correct email!</span>
              ) : validation === "password" ? (
                <span className="text-red-700 block mb-2 text-sm font-medium">Password minimum 8 characters!</span>
              ) : validation === "name" ? (
                <span className="text-red-700 block mb-2 text-sm font-medium">Name cannot be empty!</span>
              ) : (
                ""
              )}
              <label for="name" className="block mb-2 text-sm font-medium text-gray-900">
                Your Name
              </label>
              <input
                onChange={handleChange}
                type="name"
                name="name"
                id="name"
                className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="eg: Saqib"
                required=""
              />
            </div>
            <form className="space-y-4" action="#">
              <div className="mb-4">
                <label for="email" className="block mb-2 text-sm font-medium text-gray-900">
                  Your email
                </label>
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div className="mb-4">
                <label for="password" className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  onChange={handleChange}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required=""
                />
              </div>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-100 focus:ring-3 focus:ring-primary-300"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="text-gray-500">Remember me</label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline pl-3">
                  Forgot password?
                </a>
              </div>
              <button
                onClick={onClick}
                className="w-full text-black bg-slate-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </section>
      <div className='fixed bottom-0 right-0 mr-4 mb-4'>
  <Footer />
</div>
    </div>
  )
}

export default SignUp
