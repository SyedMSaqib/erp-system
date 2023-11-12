import React, { useContext, useEffect } from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
import customerSaleContext from '../../context/customerSale/customerSaleContext';

const CustomRadialBarChart = () => {
  const { customerSale, getAllcustomersSales } = useContext(customerSaleContext);

  useEffect(() => {
    getAllcustomersSales();
  }, []);

  
  const COLORS = [ '#E3A1A1', '#C8D9EB', '#D8E4BC', '#FFD700', '#B1E7B2'];
  const sortedSales = customerSale.slice().sort((a, b) => b.quantity - a.quantity);


  const top5Sales = sortedSales.slice(0, 5);

  const data = top5Sales.map((sale, index) => ({
    name: sale.product,
    uv: sale.quantity,
    pv: sale.salesAmount,
    fill: COLORS[index % COLORS.length], 
  }));

  const style = {
    top: '50%',
    left: '65%', 
    // left:'0',
    transform: 'translate(0, -50%)',
    lineHeight: '24px',
  };

  return (
    <ResponsiveContainer  width="100%" height={300}>
      <RadialBarChart  cx="40%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={data}>
        <RadialBar 
          minAngle={15}
          label={{ position: 'insideStart', fill: '#666' }}
          background
          clockWise
          dataKey="uv"
        />
        <Legend iconSize={5} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default CustomRadialBarChart;
