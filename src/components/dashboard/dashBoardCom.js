import React from 'react';
import Barchart from './barchart';
import Arreachart from './areaChart';
import CustomPieChart from './pieChart';
import CustomRadialBarChart from './radialChart';
import CustomComposedChart from './composedChart';


const Dashboard = () => {
  return (
    <div>
    <div className='flex justify-between ml-60 mt-10'>
      <div className='w-1/2 mt-20'>
        <Barchart />
      </div>
      <div className='w-1/2'>
      <CustomRadialBarChart/>
      </div>
    </div>
    <div className=' w-1/2 ml-64 mt-16'>
        <Arreachart />
      {/* <CustomPieChart/> */}
    </div>
    {/* <div className='w-1/2 mt-8 ml-12'>
    <CustomComposedChart/>
    </div> */}
  </div>
  );
}

export default Dashboard;
