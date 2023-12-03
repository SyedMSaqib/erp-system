import React, { useState } from 'react'
import ProductContext from './productContext'
import config from '../../config';

const ProductState = (props) => {
    const host=config.apiurl
    const productDb=
        []

      const [product, setproduct] = useState(productDb)
      const [productId, setproductId] = useState(null)
      const [updateFormValues, setupdateFormValues] = useState(null)
      const authToken = localStorage.getItem('authToken');
      const [isVisible, setisVisible] = useState(false)
      const [productModelData, setproductModelData] = useState({})
      const [searchProduct, setsearchProduct] = useState([])
      
      
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
          setsearchProduct(data)
        

      }
    
    
      const addProduct=async(name,description,category,quantity,price,vendor,vendorPrice,vendorId)=>{
        
        const newProduct={
            name: name,
            description: description,
            category: category,
            price:price,
            quantity:quantity,
            vendor:vendor,
            vendorPrice:vendorPrice,
            vendorId:vendorId
          }
          setproduct(product.concat(newProduct))
        
        //Add product Api call
        
            const response = await fetch(`${host}/product/add`, {
              method: "POST", 
               
              headers: {
                "Content-Type":"application/json",
                "auth-token": authToken
                
              },
              body: JSON.stringify({name,category,description,quantity,price,vendor,vendorPrice,vendorId}),
            });
        
    }

    const updateProduct=async(id,name,description,category,quantity,price,vendor,vendorPrice,vendorId)=>{
          
      //Update product Api call
    
          const response = await fetch(`${host}/product/update/${id}`, {
            method: "PUT", 
             
            headers: {
              "Content-Type":"application/json",
              "auth-token": authToken
              
            },
            body: JSON.stringify({name,category,description,price,quantity,vendor,vendorPrice,vendorId}),
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

    <ProductContext.Provider value={{product,deleteProduct,addProduct,updateProduct,getAllProducts,setproductId,productId,updateFormValues,setupdateFormValues,productModelData, setproductModelData,isVisible, setisVisible,searchProduct, setsearchProduct,setproduct}}>

        {props.children}
    </ProductContext.Provider>
  )
}

export default ProductState