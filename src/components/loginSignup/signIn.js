import React, { useContext, useEffect, useState } from 'react'
import authContext from '../../context/auth/authContext'
import { Link, useNavigate,  } from 'react-router-dom';
import validator from 'validator';
import BgImg from '../photos/loginBg.jpg'
import toast  from 'react-hot-toast';
import SasLogo from '../sidebar/logos/sasLogo2.png'
import Footer from '../loginSignup/footer'





const SignIn = ({settokenUpdate}) => {
  var authToken =null
const {email,setEmail,password,setPassword,login,responeFromServer}=useContext(authContext)
const [value, setvalue] = useState(true)
const [validation, setvalidation] = useState(true)
const [checkEmailPassword, setcheckEmailPassword] = useState(true)
const navigate = useNavigate();




const handleChange = (e) => {
  const { name, value } = e.target;
  
  if (name === 'email') {
    setEmail(value);
  } else if (name === 'password') {
    setPassword(value);
  }
};
useEffect(() => {

    if(responeFromServer.ok)
    {
      setvalue(false)
    } 
  
}, [login])
const checkAuth=async()=>
{
 if(validator.isEmail(email))
 {
  setvalidation(true)
   await login(email,password);
   if(await responeFromServer.ok)
   toast.success("Login successfully")
   
   if(!responeFromServer.ok)
   {
     setcheckEmailPassword(false)
   }
   authToken =  localStorage.getItem('authToken');
   if(authToken!==null)
   {
   settokenUpdate(true)
   toast.success("Login Succcess") 
  setvalidation(true)

  }
  }
  else
  {
    setvalidation(false)
    toast.error("Login Failed")

  }
  
}
const onClick = async(event) => {
  event.preventDefault();
  checkAuth()

};

useEffect(() => {
  if(checkEmailPassword===false)
  toast.error("Login Failed")
}, [checkEmailPassword])

const AuthToken =  localStorage.getItem('authToken');
if(AuthToken!==null||value===false)
{
  navigate("/dashboard")
  return null
}

else
  return (
<div className="flex justify-center items-center w-screen h-screen bg-cover" style={{ backgroundImage: `url(${BgImg})` }} >
    <section className='mb-10'>
    <div >
      <div className="w-full bg-gray-50  rounded-lg shadow-md md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div className=' flex justify-center'>

         <img className="w-24" src={SasLogo} alt="Logo" />
          </div>
          
          <h1 className="flex justify-center font-mono  text-sm  leading-tight tracking-tight text-gray-900 md:text-xl">
            SIGN IN
          </h1>
          <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                        {validation===false?<span className='text-red-700 block mb-2 text-sm font-medium'>Enter correct email!</span>:
                        checkEmailPassword===false?<span className='text-red-700 block mb-2 text-sm font-medium'>Email or Password incorrect!</span>:""}
                        <label  htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                        <input onChange={handleChange} type="email" name="email" id="email" className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required=""/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""/>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-100 focus:ring-3 focus:ring-primary-300" required=""/>
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="remember" className="text-gray-500">Remember me</label>
                            </div>
                        </div>
                        <Link  className="text-sm font-medium text-primary-600 hover:underline pl-3">Forgot password?</Link>
                    </div>
                    <Link   onClick={onClick} type='submit' className="w-full text-black bg-slate-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-40">Sign in</Link>
                    <div   className="text-sm font-light text-gray-500">
                        Don’t have an account yet? <Link to={"/signUp"} className="font-medium text-primary-600 hover:underline">Sign up</Link>
                    </div>
                </form>
            </div>
        </div>
        
    </div>
</section>
<div className='fixed bottom-0 '>
  <Footer />
</div>

</div>

  )
}

export default SignIn