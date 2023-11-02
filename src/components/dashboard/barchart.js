import React, { useContext, useEffect } from 'react';
import customerSaleContext from "../../context/customerSale/customerSaleContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Barchart = () => {
  const { customerSale, getAllcustomersSales } = useContext(customerSaleContext);

  useEffect(() => {
    getAllcustomersSales();
  }, []);

  // Calculate the maximum value in the data
  const maxValue = Math.max(...customerSale.map(sale => sale.quantity));

  const data = customerSale.map((sale, index) => ({
    name: sale.product,
    value: sale.quantity,
  }));

  return (
    <div className='my-36'>
      <BarChart
        width={500}
        height={200}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, maxValue]} /> {/* Set the Y-Axis domain based on the maximum value */}
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default Barchart;
