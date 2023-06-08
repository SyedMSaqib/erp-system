import React, { useState } from 'react'
import ProductContext from './productContext'


const ProductState = (props) => {
    const productDb=
        [{
          _id: "647e4e692e8c5cafdfef6381",
          user: "647e4e562e8c5cafdfef637f",
          name: "hard ball",
          description: "blah blah",
          category: "sports",
          date: "2023-06-05T21:06:49.039Z",
          __v: 0
        },
        {
            _id: "647e4e692e8c5cafdfef6381",
            user: "647e4e562e8c5cafdfef637f",
            name: "hard ball",
            description: "blah blah",
            category: "sports",
            date: "2023-06-05T21:06:49.039Z",
            __v: 0
          },
          {
            _id: "647e4e692e8c5cafdfef6381",
            user: "647e4e562e8c5cafdfef637f",
            name: "hard ball",
            description: "blah blah",
            category: "sports",
            date: "2023-06-05T21:06:49.039Z",
            __v: 0
          },
          {
            _id: "647e4e692e8c5cafdfef6381",
            user: "647e4e562e8c5cafdfef637f",
            name: "hard ball",
            description: "blah blah",
            category: "sports",
            date: "2023-06-05T21:06:49.039Z",
            __v: 0
          },
          {
            _id: "647e4e692e8c5cafdfef6381",
            user: "647e4e562e8c5cafdfef637f",
            name: "hard ball",
            description: "blah blah",
            category: "sports",
            date: "2023-06-05T21:06:49.039Z",
            __v: 0
          },
          {
            _id: "647e4e692e8c5cafdfef6381",
            user: "647e4e562e8c5cafdfef637f",
            name: "hard ball",
            description: "blah blah",
            category: "sports",
            date: "2023-06-05T21:06:49.039Z",
            __v: 0
          },
          
    ]

      const [product, setproduct] = useState(productDb)
    return (

    <ProductContext.Provider value={{product,setproduct}}>

        {props.children}
    </ProductContext.Provider>
  )
}

export default ProductState