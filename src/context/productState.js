import React, { useState } from 'react'
import ProductContext from './productContext'


const ProductState = (props) => {
    const productDb=
        [{
          _id: "647e4e692e8c5caafdfef6381",
          user: "647e4e562e8c5cafdfef637f",
          name: "hard ball",
          description: "blah blah",
          category: "sports",
          date: "2023-06-05T21:06:49.039Z",
          __v: 0
        },
        {
            _id: "647e4e692e8c5cdafdfef6381",
            user: "647e4e562e8c5cafdfef637f",
            name: "hard ball",
            description: "blah blah",
            category: "sports",
            date: "2023-06-05T21:06:49.039Z",
            __v: 0
          },
          {
            _id: "647e4e692e8c5caxcfdfef6381",
            user: "647e4e562e8c5cafdfef637f",
            name: "hard ball",
            description: "blah blah",
            category: "sports",
            date: "2023-06-05T21:06:49.039Z",
            __v: 0
          },
          {
            _id: "647e4e692e8c5cafddffef6381",
            user: "647e4e562e8c5cafdfef637f",
            name: "hard ball",
            description: "blah blah",
            category: "sports",
            date: "2023-06-05T21:06:49.039Z",
            __v: 0
          },
          {
            _id: "647e4e692e8c5cafdfesdff6381",
            user: "647e4e562e8c5cafdfef637f",
            name: "hard ball",
            description: "blah blah",
            category: "sports",
            date: "2023-06-05T21:06:49.039Z",
            __v: 0
          },
          {
            _id: "647e4e692e8c5cafdfef63sdf81",
            user: "647e4e562e8c5cafdfef637f",
            name: "hard ball",
            description: "blah blah",
            category: "sports",
            date: "2023-06-05T21:06:49.039Z",
            __v: 0
          },

    ]

      const [product, setproduct] = useState(productDb)
    
    
      const addProduct=(name,description,category)=>{
        const newProduct={
            _id: "647e4e692e8c5cafdfef6381",
            user: "647e4e562e8c5cafdfef637f",
            name: name,
            description: description,
            category: category,
            date: "2023-06-05T21:06:49.039Z",
            __v: 0
          }
          setproduct(product.concat(newProduct))
    }
    const deleteProduct=(id)=>{
        console.log(id)
        const updatedProduct=product.filter((data)=>{
            return data._id!==id
        })
        setproduct(updatedProduct)
    }
    
      return (

    <ProductContext.Provider value={{product,deleteProduct,addProduct}}>

        {props.children}
    </ProductContext.Provider>
  )
}

export default ProductState