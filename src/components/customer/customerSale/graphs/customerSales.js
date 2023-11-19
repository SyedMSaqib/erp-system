import React, { useContext, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import customerSaleContext from '../../../../context/customerSale/customerSaleContext';
import { isVisible } from '@testing-library/user-event/dist/utils';



const CustomerSales = () => {
    const { customerSale, getAllcustomersSales,customerSaleGraph, setcustomerSaleGraph} = useContext(customerSaleContext);
  
    useEffect(() => {
      getAllcustomersSales();
    }, []);
  
 
    const filteredCustomerSales = customerSale.filter(sale => sale.customerId === customerSaleGraph.customerId);
  
  
    useEffect(() => {
     
    }, [filteredCustomerSales]);
  
    // Format data for the chart
    const chartData = {
      series: [{
        name: "Customer Sales",
        data: filteredCustomerSales.map(sale => ({
          x: new Date(sale.date).getTime(),
          y: sale.quantity
        }))
      }],
      options: {
        xaxis: {
          type: 'datetime', // Set x-axis type to datetime
          labels: {
            formatter: function(val) {
              return new Date(val).toLocaleDateString(); // Format the label as per your requirement
            }
          }
        },
      }
    };
    if(!customerSaleGraph.isvisible)
    return false
  
    return (
        <div className="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none ">
        <div  onClick={()=>{setcustomerSaleGraph({isVisible:false})}} className="backdrop-blur-sm bg-black bg-opacity-20 w-full h-full absolute"></div>
         <div  className="w-[60rem] p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white z-50 h- overflow-y-auto">
        <ReactApexChart options={chartData.options} series={chartData.series} type="area" height={250} width={900} />
      </div>
      </div>
    );
  };
  
  export default CustomerSales;
  