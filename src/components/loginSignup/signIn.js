import React, { useContext, useEffect, useState } from 'react'
import authContext from '../../context/auth/authContext'
import { Link,  } from 'react-router-dom';
import validator from 'validator';




const SignIn = ({settokenUpdate}) => {
  var authToken =null
const {email,setEmail,password,setPassword,login,responeFromServer}=useContext(authContext)
const [value, setvalue] = useState(true)
const [validation, setvalidation] = useState(true)
const [checkEmailPassword, setcheckEmailPassword] = useState(true)




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
const  checkAuth=async()=>
{
 if(validator.isEmail(email))
 {
  setvalidation(true)
   await login(email,password);
   if(!responeFromServer.ok)
   {
    setcheckEmailPassword(false)
   }
   authToken =  localStorage.getItem('authToken');
   if(authToken!==null)
   settokenUpdate(true)
  }
  else
  {
    setvalidation(false)
  }
}
const onClick = (event) => {
  event.preventDefault();
  checkAuth()

  
  
 
};
const AuthToken =  localStorage.getItem('authToken');
if(AuthToken!==null||value===false)
return null

else
  return (
<div className="flex justify-center items-center w-screen h-screen" >
    <section className={"bg-white min-h-screen flex justify-center items-center " }>
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-slate-100 rounded-lg shadow-md md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Sign in to your account
          </h1>
          <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                        {validation===false?<span className='text-red-700 block mb-2 text-sm font-medium'>Enter correct email!</span>:
                        checkEmailPassword===false?<span className='text-red-700 block mb-2 text-sm font-medium'>Email or Password incorrect!</span>:""}
                        <label  for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                        <input onChange={handleChange} type="email" name="email" id="email" class="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required=""/>
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""/>
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                              <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-100 focus:ring-3 focus:ring-primary-300" required=""/>
                            </div>
                            <div class="ml-3 text-sm">
                              <label for="remember" class="text-gray-500">Remember me</label>
                            </div>
                        </div>
                        <Link to={"/sidebar"} class="text-sm font-medium text-primary-600 hover:underline">Forgot password?</Link>
                    </div>
                    <Link   onClick={onClick} type='submit' class="w-full text-black bg-slate-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-40">Sign in</Link>
                    <div   class="text-sm font-light text-gray-500">
                        Don’t have an account yet? <Link to={"/signUp"} class="font-medium text-primary-600 hover:underline">Sign up</Link>
                    </div>
                </form>
            </div>
        </div>
        
    </div>

</section>
{/* <footer class="bg-white rounded-lg shadow  light:bg-gray-800  ">
    <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>. All Rights Reserved.
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
            <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
        </li>
        <li>
            <a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
        </li>
        <li>
            <a href="#" class="mr-4 hover:underline md:mr-6">Licensing</a>
        </li>
        <li>
            <a href="#" class="hover:underline">Contact</a>
        </li>
    </ul>
    </div>
</footer> */}
</div>

  )
}

export default SignIn