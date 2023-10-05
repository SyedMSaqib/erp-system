import React, { useContext,useState } from 'react'
import CustomerContext from './customerContext'


const CustomerState = (props) => {
    const host="http://localhost:5000"
    const customerDb=
        []

      const [customer, setCustomer] = useState(customerDb)
      const [customerId, setCustomerId] = useState(null)
      const [updateFormValues, setupdateFormValues] = useState(null)
      const authToken = localStorage.getItem('authToken');
      
      
      const getAllcustomers=async()=>{
        //get notes Api call
        
        const response = await fetch(`${host}/customer/fetchAllCustomer`, {
            method: "GET", 
             
            headers: {
              "Content-Type": "application/json",
              "auth-token":authToken
              
            },
            
          });
          const data=await response.json(); 
          setCustomer(data)
        

      }
    
    
      const addCustomer=async(name,phone,email)=>{
        
        const newCustomer={
            name: name,
            phone: phone,
            email: email,
          }
          setCustomer(customer.concat(newCustomer))
        
        //Add customer Api call
        
            const response = await fetch(`${host}/customer/addCustomer`, {
              method: "POST", 
               
              headers: {
                "Content-Type":"application/json",
                "auth-token":authToken
                
              },
              body: JSON.stringify({name,email,phone}),
            });
        
    }

    const updateCustomer=async(id,name,email,phone)=>{
          
      //Update customer Api call
      
        
          const response = await fetch(`${host}/customer/updateCustomer/${id}`, {
            method: "PUT", 
             
            headers: {
              "Content-Type":"application/json",
              "auth-token":authToken
              
            },
            body: JSON.stringify({name,email,phone}),
          });
      
  }


    const deleteCustomer=async(id)=>{
        
        const updatedCustomer=customer.filter((data)=>{
            return data._id!==id
        })
        setCustomer(updatedCustomer)
        //api call
        const response = await fetch(`${host}/customer/deleteCustomer/${id}`, {
            method: "DELETE", 
             
            headers: {
                "auth-token":authToken
              
            },
            
          });
           
    }
    
      return (

        <CustomerContext.Provider value={{
          customer,
          getAllcustomers,
          addCustomer,
          updateCustomer,
          deleteCustomer,
          customerId,
          updateFormValues,
          setupdateFormValues,
          setCustomerId,
        }}>
          {props.children}
        </CustomerContext.Provider>
  )
}

export default CustomerState
