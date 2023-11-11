import React, { useState } from 'react'
import customeSaleContext from './customerSaleContext'


const CustomerSaleState = (props) => {
    const host="http://localhost:5000"
    const customerDb=
        []

      const [customerSale, setCustomerSale] = useState(customerDb)
      const authToken = localStorage.getItem('authToken');
  
      
      
      
      const getAllcustomersSales=async()=>{
        //get notes Api call
        
        const response = await fetch(`${host}/customerSale/fetchAllCustomerSale`, {
            method: "GET", 
             
            headers: {
              "Content-Type": "application/json",
              "auth-token": authToken
              
            },
            
          });
          const data=await response.json(); 
          setCustomerSale(data)
        

      }
      const addCustomerSale=async(customerId,product,quantity,customerName)=>{
        
        const newCustomerSale={
            customerId:customerId,
            product:product,
            quantity:quantity,
            name:customerName
          }
          setCustomerSale(customerSale.concat(newCustomerSale))
        
        //Add customer Api call
        
            const response = await fetch(`${host}/customerSale/addCustomerSales`, {
              method: "POST", 
               
              headers: {
                "Content-Type":"application/json",
                "auth-token": authToken
                
              },
              body: JSON.stringify({customerId,product,quantity,customerName}),
            });
        
    }

      return (

        <customeSaleContext.Provider value={{
            customerSale,
            getAllcustomersSales,
            addCustomerSale,
        }}>
          {props.children}
        </customeSaleContext.Provider>
  )
}

export default CustomerSaleState