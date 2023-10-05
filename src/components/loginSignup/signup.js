import React, { useContext } from 'react'
import authContext from '../../context/auth/authContext'
import { Link } from 'react-router-dom';




const SignUp = () => {
  const authToken = localStorage.getItem('authToken');
const {email,setEmail,password,setPassword,signup}=useContext(authContext)


const handleChange = (e) => {
  const { name, value } = e.target;
  
  if (name === 'email') {
    setEmail(value);
  } else if (name === 'password') {
    setPassword(value);
  }
};
const onClick = (event) => {
  event.preventDefault();
  signup(email,password);
 
 
  

  
  
};
  return (
    <section className="bg-white min-h-screen flex justify-center items-center ml-96">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ml-44">
      <div className="w-full bg-white rounded-lg shadow-md md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Sign up for an account
          </h1>
          <form className="space-y-4 md:space-y-6" action="#">
                    <div>
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
                        <a href="#" class="text-sm font-medium text-primary-600 hover:underline">Forgot password?</a>
                    </div>
                    <button onClick={onClick} type="submit" class="w-full text-black bg-slate-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign Up</button>
                    
                </form>
            </div>
        </div>
    </div>
</section>

  )
}

export default SignUp