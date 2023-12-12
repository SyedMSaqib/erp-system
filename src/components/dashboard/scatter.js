import React, { useContext, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import ProductContext from '../../context/product/productContext';

const PieChart = () => {
  const { product, getAllProducts } = useContext(ProductContext);

  useEffect(() => {
    getAllProducts();
  }, []);
  useEffect(() => {
    if (product.length > 0) {
      setChart(getProductChartData());
    }
  }, [product]);

  const calculatePercentage = (value, total) => {
    return ((value / total) * 100).toFixed(2);
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getProductChartData = () => {
    const totalQuantity = product.reduce((acc, product) => acc + parseInt(product.quantity), 0);

    const seriesData = product.map((product) => parseInt(product.quantity));
    const labels = product.map((product) => `${product.name} - ${calculatePercentage(product.quantity, totalQuantity)}%`);
    const colors = product.map(() => getRandomColor()); 

    return {
      series: seriesData,
      options: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: labels,
        legend: {
          show: false,
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
        colors: colors, 
      },
    };
  };

  const [chart, setChart] = useState(getProductChartData());

  return (
    <div style={{ position: 'relative' }}>
      <ReactApexChart options={chart.options} series={chart.series} type="pie" height={200} width={350} />
      <div style={{ position: 'absolute', top: '220px', left: '100px', zIndex: '999' }}>
        <p className='font-semibold text-xs dark:text-gray-400'>Available Stock Percentage</p>
      </div>
    </div>
  );
};

export default PieChart;
