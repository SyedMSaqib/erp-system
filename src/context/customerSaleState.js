import React, { useContext,useState } from 'react'
import customeSaleContext from './customerSaleContext'


const CustomerSaleState = (props) => {
    const host="http://localhost:5000"
    const customerDb=
        []

      const [customerSale, setCustomerSale] = useState(customerDb)
      
      
      
      const getAllcustomersSales=async()=>{
        //get notes Api call
        
        const response = await fetch(`${host}/customerSale/fetchAllCustomerSale`, {
            method: "GET", 
             
            headers: {
              "Content-Type": "application/json",
              "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3ZTRlNTYyZThjNWNhZmRmZWY2MzdmIn0sImlhdCI6MTY4NTk5OTE5MH0.tANfZWBhWrVuSXEhNvIAutanlz2LpwO0ZaJrDfN3cj0"
              
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
                "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3ZTRlNTYyZThjNWNhZmRmZWY2MzdmIn0sImlhdCI6MTY4NTk5OTE5MH0.tANfZWBhWrVuSXEhNvIAutanlz2LpwO0ZaJrDfN3cj0"
                
              },
              body: JSON.stringify({customerId,product,quantity}),
            });
        
    }

      return (

        <customeSaleContext.Provider value={{
            customerSale,
            getAllcustomersSales,
            addCustomerSale
        }}>
          {props.children}
        </customeSaleContext.Provider>
  )
}

export default CustomerSaleState