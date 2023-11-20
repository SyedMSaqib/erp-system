import React, { useContext, useEffect } from "react"
import SaleTrailContext from "../../context/saleTrail/saleTrailContext"


const ViewSaleTrails = () => {

    const saleTrailContext = useContext(SaleTrailContext)
    const { saleTrails, getAllSaleTrails, updateSaleTrail } = saleTrailContext
    
    useEffect(() => {
        getAllSaleTrails()
    }, [])
    console.log(saleTrails)






  return <div className="ml-72">sale trail</div>
}

export default ViewSaleTrails
