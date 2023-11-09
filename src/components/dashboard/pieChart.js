import React, { useContext, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import customerSaleContext from '../../context/customerSale/customerSaleContext';

const CustomPieChart = () => {
  const { customerSale, getAllcustomersSales } = useContext(customerSaleContext);

  useEffect(() => {
    getAllcustomersSales();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const customerSaleData = customerSale.map((sale, index) => ({
    name: sale.product,
    value: sale.quantity,
  }));

  return (
    <ResponsiveContainer width={500} height={200}>
      <PieChart>
        <Pie
          data={customerSaleData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {customerSaleData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
