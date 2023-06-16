import React, { useState } from 'react'
import ProductContext from './productContext'


const ProductState = (props) => {
    const host="http://localhost:5000"
    const productDb=
        []

      const [product, setproduct] = useState(productDb)
      const [productId, setproductId] = useState(null)
      const [updateFormValues, setupdateFormValues] = useState(null)
      
      
      const getAllProducts=async()=>{
        //get notes Api call
        
        const response = await fetch(`${host}/product/fetchAll`, {
            method: "GET", 
             
            headers: {
              "Content-Type": "application/json",
              "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3ZTRlNTYyZThjNWNhZmRmZWY2MzdmIn0sImlhdCI6MTY4NTk5OTE5MH0.tANfZWBhWrVuSXEhNvIAutanlz2LpwO0ZaJrDfN3cj0"
              
            },
            
          });
          const data=await response.json(); 
          setproduct(data)
        

      }
    
    
      const addProduct=async(name,description,category,price,quantity)=>{
        
        const newProduct={
            name: name,
            description: description,
            category: category,
            price:price,
            quantity:quantity,
            date: "2023-06-05T21:06:49.039Z",
            __v: 0
          }
          setproduct(product.concat(newProduct))
        
        //Add product Api call
        
            const response = await fetch(`${host}/product/add`, {
              method: "POST", 
               
              headers: {
                "Content-Type":"application/json",
                "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3ZTRlNTYyZThjNWNhZmRmZWY2MzdmIn0sImlhdCI6MTY4NTk5OTE5MH0.tANfZWBhWrVuSXEhNvIAutanlz2LpwO0ZaJrDfN3cj0"
                
              },
              body: JSON.stringify({name,category,description,price,quantity}),
            });
        
    }

    const updateProduct=async(id,name,description,category,price,quantity)=>{
          
      //Update product Api call
      
        console.log(id)
          const response = await fetch(`${host}/product/update/${id}`, {
            method: "PUT", 
             
            headers: {
              "Content-Type":"application/json",
              "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3ZTRlNTYyZThjNWNhZmRmZWY2MzdmIn0sImlhdCI6MTY4NTk5OTE5MH0.tANfZWBhWrVuSXEhNvIAutanlz2LpwO0ZaJrDfN3cj0"
              
            },
            body: JSON.stringify({name,category,description,price,quantity}),
          });
      
  }


    const deleteProduct=async(id)=>{
        
        const updatedProduct=product.filter((data)=>{
            return data._id!==id
        })
        setproduct(updatedProduct)
        //api call
        const response = await fetch(`${host}/product/delete/${id}`, {
            method: "DELETE", 
             
            headers: {
              "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3ZTRlNTYyZThjNWNhZmRmZWY2MzdmIn0sImlhdCI6MTY4NTk5OTE5MH0.tANfZWBhWrVuSXEhNvIAutanlz2LpwO0ZaJrDfN3cj0"
              
            },
            
          });
           
    }
    
      return (

    <ProductContext.Provider value={{product,deleteProduct,addProduct,updateProduct,getAllProducts,setproductId,productId,updateFormValues,setupdateFormValues}}>

        {props.children}
    </ProductContext.Provider>
  )
}

export default ProductState