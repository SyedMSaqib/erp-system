import React, { useContext, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import customerSaleContext from '../../../../context/customerSale/customerSaleContext';


const CustomerSales = () => {
  const { customerSale, getAllcustomersSales, customerSaleGraph, setcustomerSaleGraph } = useContext(customerSaleContext);

  useEffect(() => {
    getAllcustomersSales();
  }, []);

  const filteredCustomerSales = customerSale.filter((sale) => sale.customerId === customerSaleGraph.customerId);

  useEffect(() => {}, [filteredCustomerSales]);

  // Calculate sale numbers
  const chartData = {
    series: [
      {
        name: 'Customer Sales',
        data: filteredCustomerSales.map((sale, index) => ({
          x: index + 1, 
          y: sale.quantity,
        })),
      },
    ],
    options: {
      xaxis: {
        type: 'Sale Number',
      },
    },
  };

  if (!customerSaleGraph.isvisible) return false;

  return (
    <div className="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none ">
      <div onClick={() => setcustomerSaleGraph({ isVisible: false })} className="backdrop-blur-sm bg-black bg-opacity-20 w-full h-full absolute"></div>
      <div className="w-[60rem] p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white z-50 h- overflow-y-auto dark:bg-gray-900">
        <ReactApexChart options={chartData.options} series={chartData.series} type="area" height={250} width={900} />
      </div>
    </div>
  );
};

export default CustomerSales;
