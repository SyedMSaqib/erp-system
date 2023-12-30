import React, { useEffect } from 'react';
import SplineChart from './splineChart';
import ColoumnChart from './coloumnChart';
import Scatter from './scatter';
import MixedChart from './MixedChart';
import RangeArea from './RangeArea';
import LineChart from './lineChart';
import Footer from '../loginSignup/footer';



const Dashboard = () => {
  const authToken =  localStorage.getItem('authToken');
useEffect(() => { 
}, [authToken])

if(authToken)
  return (
    <div className="dark:bg-gray-900 bg-slate-50  flex justify-center">
    <div className='pt-5 '>
    <div className='ml-64 bg-slate-100 dark:bg-gray-950 dark:border-gray-600 grid grid-cols-2 border border-slate-200 shadow-2xl rounded-xl w-[68rem]   '>
    <div className='mt-16'>
    <SplineChart/>
    </div>
    {/* <div className='mt-16 '>
      <ColoumnChart/>
    </div> */}
    <div className='mt-16'>
     <Scatter/>
    </div>
    
    
    <div className=' grid grid-cols-2 '>
    
    
    <div className='mt-16'>
    <RangeArea/>
    </div>
      <div className='mt-16 ml-[22rem]'>
      <LineChart/>
      </div>
    </div>
    </div>
    <div className='ml-52'>
  <Footer/>
</div>
</div>
      {/* <div className='sm:grid sm:grid-rows-1 sm:overflow-auto sm:ml-64 lg:ml-0'>
    <div className='sm:flex sm:justify-between sm:ml-60 '>
      <div className='w-1/2 mt-20'>
        <Barchart />
      </div>
      <div className='w-1/2 mr-44 '>
      <CustomRadialBarChart/>
      </div>
    </div>
    <div className=' flex justify-between w-1/2 ml-64 '>
    <div className='w-1/2 mt-20'>
    <Arreachart />
      </div>
       
  
      <div className='w-1/2 mt-20 ml-44'>
        <Barchart />
      </div>
    </div>
    
   
  </div> */}
  </div>
  );
}

export default Dashboard;
