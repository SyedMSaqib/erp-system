import { useContext, useState } from "react"
import SelectData from "./../customer/customerSale/icons/selectData"
import Employees from "./../roles/employees"
import RolesContext from "../../context/roles/rolesContext"
import { useEffect } from "react"
import validator from "validator"
import toast from "react-hot-toast"

const AddRoles = () => {
  const roles = ["Sales Manager", "Inventory Manager", "Accountant", "HR"]
  const { isVisible, setisVisible, roleData, createRole } = useContext(RolesContext)
  const [Emp_email, setEmp_email] = useState(null)
  const [Emp_id, setEmp_id] = useState("")
  const [Role, setRole] = useState("Sales Manager")
  const [Password, setPassword] = useState("")
  const handleRole = (e) => {
    setRole(e.target.value)
  }
  const onClick = () => {
    if (validator.isLength(Password, { min: 8 })) {
      createRole(Role, Emp_email, Password, Emp_id)
    } else {
      toast.error("Enter Valid password")
    }
  }

  useEffect(() => {
    if (roleData && roleData.email) setEmp_id(roleData._id)
    if (roleData && roleData.email) setEmp_email(roleData.email)
  }, [roleData])
  const openEmployeeModal = () => {
    setisVisible(true)
  }
  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "password") {
      setPassword(value)
    }
  }
  return (
    <>
      <Employees />

      <div className="lg:flex lg:justify-center lg:content-center sm:ml-64">
        <div className="shadow-xl md:w-[27rem] lg:mt-10 sm:w-[20rem] mb-5  mx-auto  border dark:text-gray-300 dark:bg-gray-950 bg-slate-50 border-gray-300 dark:border-gray-600 rounded-xl">
          <div className="pl-8 py-8 px-8 pr-8">
            <div>
              <h1 className="mb-1 font-bold text-3xl flex gap-1 items-baseline font-mono">
                Add Role<span className="text-sm text-gray-400">SAS ERP</span>
              </h1>
              <div className="grid  lg:gap-8 sm:gap-3 py-10 px-8 sm:grid-cols-1 bg-slate-50 rounded-md dark:bg-gray-950 border-t-4 border-gray-400">
                <div className="flex flex-row ">
                  <div className="w-72"></div>
                </div>

                <div className="flex flex-row ">
                  <div className="w-72">
                    <div>
                      <label className=" text-sm font-medium text-gray-700 w-24 dark:text-gray-400 pt-2">
                        Role:
                      </label>
                      <select
                        id="roles"
                        name="roles"
                        class="bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={handleRole}
                        // value={Emp_email}
                      >
                        {roles.map((roles) => (
                          <option key={roles} value={roles}>
                            {roles}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row ">
                  <div className="w-72">
                    <div className="bg-white dark:bg-gray-900 flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700">
                      <input
                        className="peer dark:bg-gray-900 block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0 dark:text-gray-300"
                        name="Employee email"
                        placeholder="Employee "
                        //   onChange={handleChange}
                        value={Emp_email}
                        disabled={true}
                      />
                      <label
                        html="Employee"
                        className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                      >
                        Employee
                      </label>
                    </div>
                  </div>

                  <div onClick={openEmployeeModal} className="w-5 pt-2  cursor-pointer">
                    <SelectData />
                  </div>
                </div>

                <div className="w-72">
                  <label
                    htmlFor="password"
                    className="block w-24  text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className={`bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                    required=""
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center space-x-10">
              <button
                onClick={onClick}
                type="button"
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-green-400 hover:text-green-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-green-500 w-[8rem]"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddRoles
