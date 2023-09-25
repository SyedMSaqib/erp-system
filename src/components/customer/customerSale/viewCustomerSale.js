import React, { useContext, useEffect } from "react";
import customerSaleContext from "../../../context/customerSaleContext";

const ViewCustomerSale = () => {
  const { customerSale, getAllcustomersSales } = useContext(customerSaleContext);

  useEffect(() => {
    getAllcustomersSales();
  }, []);
 

  return (
    <div>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 ml-72">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Customer ID
              </th>
              <th scope="col" className="px-28 py-4 font-medium text-gray-900">
                Product
              </th>
              <th scope="col" className="px-20 py-4 font-medium text-gray-900">
                Quantity
              </th>
              <th scope="col" className="px-28 py-4 font-medium text-gray-900">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {customerSale.map((saleItem) => (
              <tr className="hover:bg-gray-50" key={saleItem._id}>
                <td className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                  <div className="text-sm">
                    <div className="font-medium text-gray-700">
                      {saleItem.customerId}
                    </div>
                  </div>
                </td>
                <td className="px-20 py-4">{saleItem.product}</td>
                <td className="px-20 py-4">{saleItem.quantity}</td>
                <td className="px-20 py-4">{saleItem.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewCustomerSale;
