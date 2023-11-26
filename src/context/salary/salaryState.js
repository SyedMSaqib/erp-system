import React, { useState } from "react";
import SalaryContext from "./salaryContext";
import config from "../../config";

const SalaryState = (props) => {
  const host = config.apiurl;
  const authToken = localStorage.getItem("authToken");
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

  const addSalary = async (Month, days) => {
    try {
      await fetch(`${host}/salary/addSalary`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify(Month, days)
      });
    
    } catch (error) {
      console.error("Error updating salary:", error);
    }
  };


  return (
    <SalaryContext.Provider
      value={{
        addSalary
      }}
    >
      {props.children}
    </SalaryContext.Provider>
  );
};

export default SalaryState;
