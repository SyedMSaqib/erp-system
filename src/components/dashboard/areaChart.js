import React, { useContext, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import customerSaleContext from '../../context/customerSale/customerSaleContext';

const Areachart = () => {
  const { customerSale, getAllcustomersSales } = useContext(customerSaleContext);
  useEffect(() => {
    getAllcustomersSales();
  }, []);
  
  const data = customerSale.map((sale, index) => ({
    name: sale.product,
    value: sale.quantity,
  }));


  const maxDataValue = Math.max(...data.map(item => item.value));
  
  return (
    <div className="flex justify-end my-56" style={{ width: '40%', height: 200 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, maxDataValue]} /> {/* Adjust the domain as needed */}
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Areachart;
