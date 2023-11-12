import React, { useContext, useEffect } from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
import customerSaleContext from '../../context/customerSale/customerSaleContext';

const CustomRadialBarChart = () => {
  const { customerSale, getAllcustomersSales } = useContext(customerSaleContext);

  useEffect(() => {
    getAllcustomersSales();
  }, []);

  const COLORS = ['#FFD800', '#4DB6AC', '#9575CD', '#FF80AB', '#AED581'];

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
    transform: 'translate(0, -50%)',
    lineHeight: '24px',
    fontSize: 14
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <ResponsiveContainer width="100%" height={300}  style={{ marginBottom: '-25px' }}>
        <RadialBarChart cx="40%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={data}>
          <RadialBar
            minAngle={15}
            label={{ position: 'bottom', fill: '#666' , fontSize: 12}}
            background
            clockWise
            dataKey="uv"
          />
          <Legend iconSize={5} layout="vertical" verticalAlign="middle"  wrapperStyle={style} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className='text-center'>
        <p className='font-bold font-mono'>Top 5 Sales</p>
      </div>
    </div>
  );
};

export default CustomRadialBarChart;
