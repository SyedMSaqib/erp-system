import React, { useContext, useEffect } from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
import customerSaleContext from '../../context/customerSale/customerSaleContext';

const CustomRadialBarChart = () => {
  const { customerSale, getAllcustomersSales } = useContext(customerSaleContext);

  useEffect(() => {
    getAllcustomersSales();
  }, []);

  // Define a custom color palette
  const COLORS = [  '#E3A1A1',
  '#C8D9EB',
  '#D8E4BC',
  '#FFD700',
  '#B1E7B2',
  '#FFC0CB',
  '#ADD8E6',
  '#B19CD9',
  '#FFD700',
  '#98FB98',
  '#FFA07A',
  '#87CEEB',
  '#DDA0DD',
  '#F0E68C',
  '#9ACD32',
  '#B0E0E6',
  '#FFA500',
  '#F08080',
  '#7B68EE',
  '#FAFAD2',
  '#00FFFF',
  '#FFB6C1',
  '#00FF7F',
  '#F5DEB3',
  '#90EE90',
  '#AFEEEE',
  '#FA8072',
  '#B0C4DE',
  '#32CD32',
  '#A9A9A9',];

  const data = customerSale.map((sale, index) => ({
    name: sale.product,
    uv: sale.quantity,
    pv: sale.salesAmount,
    fill: COLORS[index % COLORS.length], // Assign colors based on index
  }));

  const style = {
    top: '50%',
    right: 0,
    transform: 'translate(0, -50%)',
    lineHeight: '24px',
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadialBarChart cx="40%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={data}>
        <RadialBar
          minAngle={15}
          label={{ position: 'insideStart', fill: '#666' }}
          background
          clockWise
          dataKey="uv"
        />
        <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default CustomRadialBarChart;
