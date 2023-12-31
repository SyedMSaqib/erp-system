import React, { useContext, useState, useEffect } from "react"
import authContext from "../../context/auth/authContext"
import validator from "validator"
import BgImg from '../sidebar/logos/bgImg2.jpg'
import SasLogo from '../sidebar/logos/sasLogo2.png'
import Footer from '../loginSignup/footer'
import SignUpSuccess from "./signUpSuccess";
import toast from "react-hot-toast"
import { Link } from "react-router-dom"


const SignUp = () => {
  
  const { email, setEmail, password, setPassword, signup, setName, name,setSignUpPopUpVisible,responeFromServerSignUp} =
    useContext(authContext)
  const [validation, setvalidation] = useState("")
  const [validateEmail, setvalidateEmail] = useState(false)
  const [validatePassword, setvalidatePassword] = useState(false)
  const [validateName, setvalidateName] = useState(false)
  const [emailAlreadyExists, setemailAlreadyExists] = useState(false)

  const NameValidator = (str) => {
    return /^[A-Za-z\s]+$/.test(str);
  }
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
       await signup(email, password, name);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  }
  useEffect(() => {
    if (responeFromServerSignUp.status===200) {
      setSignUpPopUpVisible(true);
      setemailAlreadyExists(false)
    }
    else if(responeFromServerSignUp.status===403) {
      setemailAlreadyExists(true)
      toast.error(<span><span className='font-bold'>Validation failed : </span>{email} Alredy exists</span>, {
        icon: '❌',
      });
      setvalidateEmail(false)
    }
  }, [responeFromServerSignUp])
  
  

  const checkSignUp = async () => {
    if (validator.isEmail(email)) {
      setvalidateEmail(true)

    } else {
      setvalidation("email")
      setvalidateEmail(false)

    }
    if (validator.isLength(password, { min: 8 })) {
      setvalidatePassword(true)
      

    } else {
      setvalidation("password")
      setvalidatePassword(false)

    }
    if (validator.isLength(name, { min: 1 }) && NameValidator(name)) {
      setvalidateName(true)


    } else {
      setvalidation("name")
      setvalidateName(false)
    }
  
  }
  useEffect(() => {
    if (validateEmail && validatePassword && validateName) {
      signUp()
      setvalidation("")

    }
  }, [validateEmail, validatePassword, validateName])

  const onClick =  (event) => {
    event.preventDefault()
    checkSignUp()
    
  }

  return (
    <>
    <SignUpSuccess/>
    <div className="flex justify-center items-center w-screen h-screen bg-cover" style={{ backgroundImage: `url(${BgImg})` }} >
      
      <section className='mb-14'> 
      
        <div className="max-w-md w-full">
          
          <div className="bg-gray-50 rounded-lg shadow-md p-8 ">
          <div className=' flex justify-center'>

         <img className="w-24" src={SasLogo} alt="Logo" />
          </div>
          
          <h1 className="flex justify-center font-mono  text-sm   leading-tight tracking-tight text-gray-900 md:text-xl">
            SIGN UP
          </h1>
            <div className="">
              {validation === "email" ? (
                <span className="text-red-700 block  text-sm font-medium">Enter correct email!</span>
                ) : validation === "password" ? (
                <span className="text-red-700 block  text-sm font-medium">Password minimum 8 characters!</span>
              ) : validation === "name" ? (
                <span className="text-red-700 block  text-sm font-medium">Enter Valid Name!</span>
              ) : emailAlreadyExists? (
                <span className="text-red-700 block  text-sm font-medium">Email Aready Exists!</span>
              ):""}
              <label for="name" className="block mb-2 text-sm font-medium text-gray-900">
                Your Name
              </label>
              <input
                onChange={handleChange}
                type="name"
                name="name"
                id="name"
                className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-2"
                placeholder="eg: Saqib"
                required=""
              />
            </div>
            <form className="space-y-2 w-60" >
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
                
              </div>
              <button
                onClick={onClick}
                className="w-full text-black bg-slate-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Sign Up
              </button>
              <div className="text-sm font-light text-gray-500">
                    Already have an account?{" "}
                    <Link to={"/signIn"} className="font-medium text-primary-600 hover:underline">
                      Sign in
                    </Link>
                  </div>
            </form>
          </div>
        </div>
      </section>
      <div className='fixed bottom-0 '>
  <Footer />
</div>
    </div>
    </>
  )
}

export default SignUp
