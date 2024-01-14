import React, { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
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
import { Toaster } from "react-hot-toast"
import Dashboard from "./components/dashboard/dashBoardCom"
import SaleTrailState from "./context/saleTrail/saleTrailState"
import ViewSaleTrails from "./components/saleTrails/viewSaleTrails"
import VendorState from "./context/vendor/vendorState"
import AddVendor from "./components/vendor/addVendor"
import UpdateVendor from "./components/vendor/updateVendor"
import ViewVendors from "./components/vendor/viewVendors"
import VenderTrailState from "./context/venderTrail/venderTrailState"
import ViewVenderTrails from "./components/venderTrails/viewVenderTrails"
import VenderPaymentStatus from "./components/paymentStatus/venderPaymentStatus"
import SalePaymentStatus from "./components/paymentStatus/salePaymentStatus"
import SalaryState from "./context/salary/salaryState"
import Payroll from "./components/payrollManagement/payroll/payroll"
import EntriesState from "./context/accountEntries/EntriesState"
import Payables from "./components/accountEntries/payables"
import Receivables from "./components/accountEntries/receivables"
import Ledger from "./components/accountEntries/ledger"
import Profit from "./components/profit/profit"
import ProfitState from "./context/profit/profitState"
import ProfitPredictions from "./components/profitPredictions/profitPredictions"
import Roles from "./components/roles/roles"
import RolesState from "./context/roles/rolesState"
import AddRoles from "./components/roles/addRoles"

function PrivateRoute({ element, authenticated }) {
  return authenticated ? element : <Navigate to="/signIn" />
}

function App() {
  var authToken = null
  const [authenticated, setauthenticated] = useState(false)
  const [tokenUpdate, settokenUpdate] = useState(false)
  const [loading, setloading] = useState(true)

  useEffect(() => {
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
    <div className="bg-slate-50  dark:bg-gray-900 ">
      <RolesState>
        <ProfitState>
          <EntriesState>
            <SalaryState>
              <VenderTrailState>
                <VendorState>
                  <SaleTrailState>
                    <AuthState>
                      <Toaster />
                      <CustomerState>
                        <ProductState>
                          <CustomerSaleState>
                            <EmployeeState>
                              <AttendanceState>
                                <BrowserRouter>
                                  {loading ? (
                                    <div className="flex flex-col justify-center items-center w-screen h-screen bg-white">
                                      <img
                                        src={loadingGif}
                                        alt="Loading"
                                        className="w-48 h-32 bg-white"
                                      />
                                      <span>Loading...</span>
                                    </div>
                                  ) : (
                                    <div className="h-screen ">
                                      {authenticated ? <Sidebar /> : null}
                                      <Routes>
                                        <Route
                                          path="/addProduct"
                                          element={
                                            <PrivateRoute
                                              element={<AddProduct />}
                                              authenticated={authenticated}
                                            />
                                          }
                                        />
                                        <Route
                                          path="/viewProduct"
                                          element={
                                            <PrivateRoute
                                              element={<ViewProduct />}
                                              authenticated={authenticated}
                                            />
                                          }
                                        />
                                        <Route path="/update" element={<UpdateModal />} />
                                        <Route
                                          path="/viewCustomers"
                                          element={
                                            <PrivateRoute
                                              element={<ViewCustomer />}
                                              authenticated={authenticated}
                                            />
                                          }
                                        />
                                        <Route
                                          path="/updateCustomers"
                                          element={
                                            <PrivateRoute
                                              element={<UpdateCustomer />}
                                              authenticated={authenticated}
                                            />
                                          }
                                        />
                                        <Route
                                          path="/addCustomers"
                                          element={
                                            <PrivateRoute
                                              element={<AddCustomers />}
                                              authenticated={authenticated}
                                            />
                                          }
                                        />
                                        <Route
                                          path="/AddCustomersSale"
                                          element={
                                            <PrivateRoute
                                              element={<AddCustomersSale />}
                                              authenticated={authenticated}
                                            />
                                          }
                                        />
                                        <Route
                                          path="/viewCustomerSale"
                                          element={
                                            <PrivateRoute
                                              element={<ViewCustomerSale />}
                                              authenticated={authenticated}
                                            />
                                          }
                                        />
                                        <Route
                                          path="/viewEmployee"
                                          element={
                                            <PrivateRoute
                                              element={<ViewEmployee />}
                                              authenticated={authenticated}
                                            />
                                          }
                                        />
                                        <Route
                                          path="/AddEmployee"
                                          element={
                                            <PrivateRoute
                                              element={<AddEmployees />}
                                              authenticated={authenticated}
                                            />
                                          }
                                        />
                                        <Route
                                          path="/UpdateEmployee"
                                          element={
                                            <PrivateRoute
                                              element={<UpdateEmployee />}
                                              authenticated={authenticated}
                                            />
                                          }
                                        />
                                        <Route
                                          path="/viewAttendance"
                                          element={
                                            <PrivateRoute
                                              element={<ViewAttendance />}
                                              authenticated={authenticated}
                                            />
                                          }
                                        />
                                        <Route
                                          path="/attendanceDate"
                                          element={
                                            <PrivateRoute
                                              element={<AttendanceDatePicker />}
                                              authenticated={authenticated}
                                            />
                                          }
                                        />
                                        <Route
                                          path="/addAttendance"
                                          element={
                                            <PrivateRoute
                                              element={<AddAttendance />}
                                              authenticated={authenticated}
                                            />
                                          }
                                        />
                                        <Route
                                          path="/addAttendanceDate"
                                          element={
                                            <PrivateRoute
                                              element={<AddAttendanceDate />}
                                              authenticated={authenticated}
                                            />
                                          }
                                        />
                                        <Route
                                          path="/addVendor"
                                          element={
                                            <PrivateRoute
                                              element={<AddVendor />}
                                              authenticated={authenticated}
                                            />
                                          }
                                        />
                                        <Route
                                          path="/updateVendor"
                                          element={
                                            <PrivateRoute
                                              element={<UpdateVendor />}
                                              authenticated={authenticated}
                                            />
                                          }
                                        />
                                        <Route
                                          path="/viewVendors"
                                          element={
                                            <PrivateRoute
                                              element={<ViewVendors />}
                                              authenticated={authenticated}
                                            />
                                          }
                                        />
                                        <Route
                                          path="/"
                                          element={<SignIn settokenUpdate={settokenUpdate} />}
                                        />
                                        <Route
                                          path="/signIn"
                                          element={<SignIn settokenUpdate={settokenUpdate} />}
                                        />
                                        <Route path="/dashboard" element={<Dashboard />} />
                                        <Route
                                          path="/ViewSalesTrail"
                                          element={
                                            <PrivateRoute
                                              element={<ViewSaleTrails />}
                                              authenticated={authenticated}
                                            />
                                          }
                                        />
                                        <Route
                                          path="/ViewVenderTrail"
                                          element={
                                            <PrivateRoute
                                              element={<ViewVenderTrails />}
                                              authenticated={authenticated}
                                            />
                                          }
                                        />
                                        <Route
                                          path="/venderPaymentStatus"
                                          element={
                                            <PrivateRoute
                                              element={<VenderPaymentStatus />}
                                              authenticated={authenticated}
                                            />
                                          }
                                        />
                                        <Route
                                          path="/salePaymentStatus"
                                          element={
                                            <PrivateRoute
                                              element={<SalePaymentStatus />}
                                              authenticated={authenticated}
                                            />
                                          }
                                        />
                                        <Route
                                          path="/payroll"
                                          element={
                                            <PrivateRoute
                                              element={<Payroll />}
                                              authenticated={authenticated}
                                            />
                                          }
                                        />
                                        <Route
                                          path="/ledger"
                                          element={
                                            <PrivateRoute
                                              element={<Ledger />}
                                              authenticated={authenticated}
                                            />
                                          }
                                        />
                                        <Route
                                          path="/payables"
                                          element={
                                            <PrivateRoute
                                              element={<Payables />}
                                              authenticated={authenticated}
                                            />
                                          }
                                        />
                                        <Route
                                          path="/receivables"
                                          element={
                                            <PrivateRoute
                                              element={<Receivables />}
                                              authenticated={authenticated}
                                            />
                                          }
                                        />
                                        <Route
                                          path="/profit"
                                          element={
                                            <PrivateRoute
                                              element={<Profit />}
                                              authenticated={authenticated}
                                            />
                                          }
                                        />
                                        <Route
                                          path="/predictions"
                                          element={
                                            <PrivateRoute
                                              element={<ProfitPredictions />}
                                              authenticated={authenticated}
                                            />
                                          }
                                        />
                                        <Route
                                          path="/manageRoles"
                                          element={
                                            <PrivateRoute
                                              element={<Roles />}
                                              authenticated={authenticated}
                                            />
                                          }
                                        />
                                        <Route
                                          path="/AddRoles"
                                          element={
                                            <PrivateRoute
                                              element={<AddRoles />}
                                              authenticated={authenticated}
                                            />
                                          }
                                        />
                                        <Route path="/sidebar" element={<SignIn />} />
                                        <Route path="/signUp" element={<SignUp />} />
                                      </Routes>
                                    </div>
                                  )}
                                </BrowserRouter>
                              </AttendanceState>
                            </EmployeeState>
                          </CustomerSaleState>
                        </ProductState>
                      </CustomerState>
                    </AuthState>
                  </SaleTrailState>
                </VendorState>
              </VenderTrailState>
            </SalaryState>
          </EntriesState>
        </ProfitState>
      </RolesState>
    </div>
  )
}

export default App
