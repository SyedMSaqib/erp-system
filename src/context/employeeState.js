import React, {  useState } from 'react';
import EmployeeContext from '../context/employeeContext';

const EmployeeState = (props) => {
  const host = 'http://localhost:5000';
  const employeeDb = [];

  const [employees, setEmployees] = useState(employeeDb);
  const [employeeId, setEmployeeId] = useState(null);
  const [updateFormValues, setUpdateFormValues] = useState(null);

  const getAllEmployees = async () => {
    try {
      const response = await fetch(`${host}/employees/fetchAllEmployees`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3ZTRlNTYyZThjNWNhZmRmZWY2MzdmIn0sImlhdCI6MTY4NTk5OTE5MH0.tANfZWBhWrVuSXEhNvIAutanlz2LpwO0ZaJrDfN3cj0",
        },
      });
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addEmployee = async (name, email,phone) => {
    try {
      const newEmployee = {
        name: name,
        phone: phone,
        email: email,
      };
      setEmployees([...employees, newEmployee]);

      const response = await fetch(`${host}/employees/addEmployee`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3ZTRlNTYyZThjNWNhZmRmZWY2MzdmIn0sImlhdCI6MTY4NTk5OTE5MH0.tANfZWBhWrVuSXEhNvIAutanlz2LpwO0ZaJrDfN3cj0",
        },
        body: JSON.stringify({ name, email, phone }),
      });

      // Handle response if needed
    } catch (error) {
      console.error(error);
    }
  };

  const updateEmployee = async (id, name, email, phone) => {
    try {
      // Update employee Api call
      const response = await fetch(`${host}/employees/updateEmployee/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3ZTRlNTYyZThjNWNhZmRmZWY2MzdmIn0sImlhdCI6MTY4NTk5OTE5MH0.tANfZWBhWrVuSXEhNvIAutanlz2LpwO0ZaJrDfN3cj0",
        },
        body: JSON.stringify({ name, email, phone }),
      });

      // Handle response if needed

      const updatedEmployees = employees.map((employee) =>
        employee._id === id ? { ...employee, name, email, phone } : employee
      );
      setEmployees(updatedEmployees);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const updatedEmployees = employees.filter((employee) => employee._id !== id);
      setEmployees(updatedEmployees);

      const response = await fetch(`${host}/employees/deleteEmployee/${id}`, {
        method: 'DELETE',
        headers: {
          
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3ZTRlNTYyZThjNWNhZmRmZWY2MzdmIn0sImlhdCI6MTY4NTk5OTE5MH0.tANfZWBhWrVuSXEhNvIAutanlz2LpwO0ZaJrDfN3cj0",
        },
      });

      // Handle response if needed
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        getAllEmployees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        employeeId,
        updateFormValues,
        setUpdateFormValues,
        setEmployeeId,
      }}
    >
      {props.children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeState;
