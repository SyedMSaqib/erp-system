import React, { useState } from 'react'
import ProductContext from './productContext'


const ProductState = (props) => {
    const host="http://localhost:5000"
    const productDb=
        []

      const [product, setproduct] = useState(productDb)
      const [productId, setproductId] = useState(null)
      const [updateFormValues, setupdateFormValues] = useState(null)
      const authToken = localStorage.getItem('authToken');
      const [isVisible, setisVisible] = useState(false)
      const [productModelData, setproductModelData] = useState({})
      
      
      const getAllProducts=async()=>{
        //get notes Api call
        
        const response = await fetch(`${host}/product/fetchAll`, {
            method: "GET", 
             
            headers: {
              "Content-Type": "application/json",
              "auth-token": authToken
              
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
                "auth-token": authToken
                
              },
              body: JSON.stringify({name,category,description,price,quantity}),
            });
        
    }

    const updateProduct=async(id,name,description,category,price,quantity)=>{
          
      //Update product Api call
    
          const response = await fetch(`${host}/product/update/${id}`, {
            method: "PUT", 
             
            headers: {
              "Content-Type":"application/json",
              "auth-token": authToken
              
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
              "auth-token": authToken
              
            },
            
          });
           
    }
    
      return (

    <ProductContext.Provider value={{product,deleteProduct,addProduct,updateProduct,getAllProducts,setproductId,productId,updateFormValues,setupdateFormValues,productModelData, setproductModelData,isVisible, setisVisible}}>

        {props.children}
    </ProductContext.Provider>
  )
}

export default ProductState