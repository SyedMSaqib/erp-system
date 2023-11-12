import React, { useContext } from 'react'
import authContext from '../../context/auth/authContext'




const SignUpSuccess = () => {

    const { setSignUpPopUpVisible,SignUpPopUpVisible  } =
    useContext(authContext)

    const onClickOk=()=>
    {
        setSignUpPopUpVisible(false)
        return (window.location.href = "/signIn")

    }

    if(!SignUpPopUpVisible)
    return false

  return (
    <div className="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none ">
    <div className="backdrop-blur-sm bg-black bg-opacity-20 w-full h-full absolute"></div>
     <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white z-50 max-h-screen overflow-y-auto">
       <div className="">
    
      <div class="text-center p-5 flex-auto justify-center">
             
      <svg xmlns="http://www.w3.org/2000/svg" class="w-14 h-16 flex items-center text-green-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M10 0a10 10 0 100 20 10 10 0 000-20zM8.707 13.707a1 1 0 001.414 0l6-6a1 1 0 00-1.414-1.414L9 11.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0z" clip-rule="evenodd"/>
</svg>

                      <h1 class="text-xl  py-4 ">Account Created Successfully, Please Sign In!</h1>
                      <p class="text-sm text-gray-500 px-8"></p>    
      </div>
     
      <div class="p-3  mt-2 text-center space-x-4 md:block">
          <button onClick={()=>onClickOk()} class="mb-2 md:mb-0 bg-slate-400 border borde-slate-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-slate-500">Okay</button>
      </div>
    </div>
  </div>
 </div>
  )
}

export default SignUpSuccess
