import React from 'react';
import Card from './viewProductCard';

const ViewProduct = () => {
  return (
    <div className='flex flex-wrap ml-52 '>
      <div className='lg:w-1/3 p-4 md:w-1/2 sm:w-1/1'>
        <Card />
      </div>
      <div className='lg:w-1/3 p-4 md:w-1/2 sm:w-1/1'>
        <Card />
      </div>
      <div className='lg:w-1/3 p-4 md:w-1/2 sm:w-1/1'>
        <Card />
      </div>
      <div className='lg:w-1/3 p-4 md:w-1/2 sm:w-1/1'>
        <Card />
      </div>
      <div className='lg:w-1/3 p-4 md:w-1/2 sm:w-1/1'>
        <Card />
      </div>
      <div className='lg:w-1/3 p-4 md:w-1/2 sm:w-1/1'>
        <Card />
      </div>
    </div>
  );
};

export default ViewProduct;
