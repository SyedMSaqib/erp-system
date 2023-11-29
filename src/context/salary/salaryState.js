import React, { useState } from "react";
import SalaryContext from "./salaryContext";
import config from "../../config";

const SalaryState = (props) => {
  const host = config.apiurl;
  const authToken = localStorage.getItem("authToken");
  const [Days, setDays] = useState("")
  const [Month, setMonth] = useState("")
  const [salaryRecord, setsalaryRecord] = useState({})
  
//   const [salaries, setSalaries] = useState(null);

//   const getAllSalaries = async () => {
//     try {
//       const response = await fetch(`${host}/salary/fetchAllSalaries`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "auth-token": authToken,
//         },
//       });

//       const data = await response.json();
//       setSalaries(data);
//     } catch (error) {
//       console.error("Error fetching salaries:", error);
//     }
//   };

const getRecord = async (Month) => {
  try {
    const res = await fetch(`${host}/salary/monthRecord`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken,
      },
      body: JSON.stringify({ Month }),
    });
    const data=await res.json()
    setsalaryRecord(data)
  
  } catch (error) {
    console.error("Error updating salary:", error);
    throw error;
  }
};
const addSalary = async (Month, days) => {
  try {
    const res = await fetch(`${host}/salary/addSalary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken,
      },
      body: JSON.stringify({ Month, days }),
    });

    return res.status;
  } catch (error) {
    console.error("Error updating salary:", error);
    throw error;
  }
};



  return (
    <SalaryContext.Provider
      value={{
        addSalary,
        Days, setDays,
        Month, setMonth,
        getRecord,salaryRecord
      }}
    >
      {props.children}
    </SalaryContext.Provider>
  );
};

export default SalaryState;
