import React, { useContext, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import customerSaleContext from '../../context/customerSale/customerSaleContext';

const SplineChart = () => {
  const { customerSale, getAllcustomersSales } = useContext(customerSaleContext);

  useEffect(() => {
    getAllcustomersSales();
  }, []);
  useEffect(() => {
   
    if (customerSale) {
      setChart(formatChartData());
    }
  }, [customerSale]);

  const formatChartData = () => {
    const seriesData = customerSale.map((sale,index) => ({
      x: index+1,
      y: sale.quantity,
      name: sale.product,
    }));

    const options = {
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    };

    return { series: [{ name: 'Sales', data: seriesData }], options };
  };

  const [chart, setChart] = useState(formatChartData());

 
  const salePeriod = () => {
    const dates = customerSale.map((sale) => new Date(sale.date).getTime());
    const startDate = new Date(Math.min(...dates));
    const endDate = new Date(Math.max(...dates));

    return `Sale Period: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
  };

  return (
    <div style={{ position: 'relative' }}>
      <ReactApexChart options={chart.options} series={chart.series} type="area" height={250} width={350} />
      <div style={{ position: 'absolute', top: '220px', left: '80px', zIndex: '999' }}>
        <p className='font-semibold text-xs dark:text-gray-400'>{salePeriod()}</p>
      </div>
    </div>
  );
};

export default SplineChart;
