import React from 'react';
import Barchart from './barchart';
import Arreachart from './areaChart';
import CustomPieChart from './pieChart';
import CustomRadialBarChart from './radialChart';
import CustomComposedChart from './composedChart';


const Dashboard = () => {
  return (
    <div className=' sm:grid sm:grid-rows-1   '>
      <div className='sm:grid sm:grid-rows-1 sm:overflow-auto sm:ml-64 lg:ml-0'>
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
       
      {/* <CustomPieChart/> */}
      <div className='w-1/2 mt-20 ml-44'>
        <Barchart />
      </div>
    </div>
    
    {/* <div className='w-1/2 mt-8 ml-12'>
    <CustomComposedChart/>
    </div> */}
  </div>
  </div>
  );
}

export default Dashboard;
