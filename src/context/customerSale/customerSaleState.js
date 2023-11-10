import React, { useState } from 'react'
import customeSaleContext from './customerSaleContext'


const CustomerSaleState = (props) => {
    const host="http://localhost:5000"
    const customerDb=
        []

      const [customerSale, setCustomerSale] = useState(customerDb)
      const authToken = localStorage.getItem('authToken');
      const [customerDataOfSale, setcustomerDataOfSale] = useState({})
      const [isDataSet, setisDataSet] = useState(false)
      
      
      
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
      const addCustomerSale=async(customerId,product,quantity)=>{
        
        const newCustomerSale={
            customerId:customerId,
            product:product,
            quantity:quantity
          }
          setCustomerSale(customerSale.concat(newCustomerSale))
        
        //Add customer Api call
        
            const response = await fetch(`${host}/customerSale/addCustomerSales`, {
              method: "POST", 
               
              headers: {
                "Content-Type":"application/json",
                "auth-token": authToken
                
              },
              body: JSON.stringify({customerId,product,quantity}),
            });
        
    }

      return (

        <customeSaleContext.Provider value={{
            customerSale,
            getAllcustomersSales,
            addCustomerSale,
            customerDataOfSale, 
            setcustomerDataOfSale,
            isDataSet,
             setisDataSet
        }}>
          {props.children}
        </customeSaleContext.Provider>
  )
}

export default CustomerSaleState