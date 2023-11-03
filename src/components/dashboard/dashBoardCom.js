import React from 'react'

import Barchart from './barchart'
import Arreachart from './areaChart'

const Dashboard = () => {
  return (
    <>
    <div className='  pl-60 py-24 '><Barchart/></div>
    < Arreachart/>
    </>
  )
}

export default Dashboard