import React, { useContext } from "react"
import authContext from "../../context/auth/authContext"
import Success from "../saleTrails/animatedIcons/success.json"
import Lottie from "lottie-react"


const SignUpSuccess = () => {
  const { setSignUpPopUpVisible, SignUpPopUpVisible } = useContext(authContext)

  const onClickOk = () => {
    setSignUpPopUpVisible(false)
    return (window.location.href = "/signIn")
  }

  if (!SignUpPopUpVisible) return false

  return (
    <div className=" h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none ">
      <div className="backdrop-blur-sm bg-black bg-opacity-20 w-full h-full absolute"></div>
      <div className=" max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg   bg-white z-50 max-h-screen overflow-y-auto ">
        <div className="">
          <div class="text-center  flex-auto justify-center pr-20 pl-20">
            <div className="flex justify-center mr-5"><Lottie
              animationData={Success}
              loop={false}
              style={{ width: "80px", height: "80px", marginLeft: "20px" }}
            /></div>

            <h1 class="text-xl  py-4 font-bold ">Account Created</h1>
            <p class="text-sm text-gray-500 px-8"> Please Sign In</p>
          </div>

          <div class="p-3  mt-2 text-center space-x-4 md:block">
            <button
              onClick={() => onClickOk()}
              class="mb-2 md:mb-0 bg-slate-400 border borde-slate-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg  transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ..."
            >
              Okay
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpSuccess
