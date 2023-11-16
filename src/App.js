import React, { useContext, useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import Sidebar from "./components/sidebar/sidebar"
import AddProduct from "./components/product/addProduct"
import ViewProduct from "./components/product/viewProduct"
import ProductState from "./context/product/productState"
import UpdateModal from "./components/product/updateModal"
import ViewCustomer from "./components/customer/viewCustomer"
import CustomerState from "./context/customer/customerState"
import UpdateCustomer from "./components/customer/updateCustomer"
import AddCustomers from "./components/customer/addCustomers"
import ViewCustomerSale from "./components/customer/customerSale/viewCustomerSale"
import CustomerSaleState from "./context/customerSale/customerSaleState"
import AddCustomersSale from "./components/customer/customerSale/addCustomerSale"
import EmployeeState from "./context/employees/employeeState"
import ViewEmployee from "./components/employee/viewEmployee"
import AddEmployees from "./components/employee/addEmployee"
import UpdateEmployee from "./components/employee/updateEmployee"
import ViewAttendance from "./components/attendance/viewAttendance"
import AttendanceState from "./context/attendance/attendanceState"
import AttendanceDatePicker from "./components/attendance/attendanceDatePicker"
import AddAttendance from "./components/attendance/addAttendance"
import AddAttendanceDate from "./components/attendance/addAttendanceDate"
import SignIn from "./components/loginSignup/signIn"
import SignUp from "./components/loginSignup/signup"
import AuthState from "./context/auth/authState"
import loadingGif from "./components/photos/loader.gif"
import  { Toaster } from 'react-hot-toast';
import Dashboard from "./components/dashboard/dashBoardCom"



function App() {
  
  var authToken = null

  const [authenticated, setauthenticated] = useState(false)
  const [tokenUpdate, settokenUpdate] = useState(false)
  const [loading, setloading] = useState(false)


  useEffect(() => {
    setloading(true)
    setTimeout(() => {
      setloading(false)
    }, 3000)
  }, [])

  useEffect(() => {
    authToken = localStorage.getItem("authToken")
    if (authToken !== null) {
      setauthenticated(true)
    } else {
      setauthenticated(false)
    }
  }, [tokenUpdate])

  return (
    <div className="bg-slate-50">
    <AuthState>
      <Toaster/>
      <CustomerState>
        <ProductState>
          <CustomerSaleState>
            <EmployeeState>
              <AttendanceState>
                { <BrowserRouter>
                  {loading ? (
                    <div className="flex flex-col justify-center items-center w-screen h-screen bg-white">
                      <img
                        src={loadingGif}
                        alt="Loading"
                        className="w-48 h-32 bg-white"
                      />
                      <span >Loading...</span>
                    </div>
                  ) : (
                    <div className="h-screen">
                      {authenticated ? <Sidebar /> : null}
                      <Routes>
                        <Route path="/addProduct" element={<AddProduct />} />
                        <Route path="/viewProduct" element={<ViewProduct />} />
                        <Route path="/update" element={<UpdateModal />} />
                        <Route path="/viewCustomers" element={<ViewCustomer />} />
                        <Route path="/updateCustomers" element={<UpdateCustomer />} />
                        <Route path="/addCustomers" element={<AddCustomers />} />
                        <Route path="/AddCustomersSale" element={<AddCustomersSale />} />
                        <Route path="/viewCustomerSale" element={<ViewCustomerSale />} />
                        <Route path="/viewEmployee" element={<ViewEmployee />} />
                        <Route path="/AddEmployee" element={<AddEmployees />} />
                        <Route path="/UpdateEmployee" element={<UpdateEmployee />} />
                        <Route path="/viewAttendance" element={<ViewAttendance />} />
                        <Route path="/attendanceDate" element={<AttendanceDatePicker />} />
                        <Route path="/addAttendance" element={<AddAttendance />} />
                        <Route path="/addAttendanceDate" element={<AddAttendanceDate />} />
                        <Route path="/" element={<SignIn settokenUpdate={settokenUpdate} />} />
                        <Route path="/signIn" element={<SignIn settokenUpdate={settokenUpdate} />} />
                        <Route path="/sidebar" element={<SignIn />} />
                        <Route path="/signUp" element={<SignUp />} />
                        <Route path="/dashboard" element={<Dashboard/>} />
                        
                      </Routes>
                    </div>
                  )}
                </BrowserRouter> }
               
              </AttendanceState>
            </EmployeeState>
          </CustomerSaleState>
        </ProductState>
      </CustomerState>
    </AuthState>
    </div>
  )
}

export default App
