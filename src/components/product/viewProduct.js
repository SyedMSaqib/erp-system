import React, { useContext, useEffect } from "react";
import ProductContext from "../../context/product/productContext";
import { Link } from "react-router-dom";

const ViewProduct = () => {
  const {
    product,
    getAllProducts,
    deleteProduct,
    setproductId,
    setupdateFormValues,
  } = useContext(ProductContext);

  useEffect(() => {
    getAllProducts();
  }, []);

  const updateProduct = (product) => {
    setproductId(product._id);
    setupdateFormValues({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      quantity: product.quantity,
    });
  };

  return (
    <div className="flex justify-center items-center w-screen " >
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 ml-64">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Name
              </th>
              <th scope="col" className="px-12 py-4 font-medium text-gray-900">
                Description
              </th>
              <th scope="col" className="px-12 py-4 font-medium text-gray-900">
                Category
              </th>
              <th scope="col" className="px-12 py-4 font-medium text-gray-900">
                Price
              </th>
              <th scope="col" className="px-12 py-4 font-medium text-gray-900">
                Quantity
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {product.map((productItem) => (
              <tr className="hover:bg-gray-50" key={productItem._id}>
                <td className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                  <div className="text-sm">
                    <div className="font-medium text-gray-700">
                      {productItem.name}
                    </div>
                  </div>
                </td>
                <td className="px-12 py-4">{productItem.description}</td>
                <td className="px-12 py-4">{productItem.category}</td>
                <td className="px-12 py-4">{productItem.price}</td>
                <td className="px-12 py-4">{productItem.quantity}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-4">
                    <button
                      x-data="{ tooltip: 'Delete' }"
                      onClick={() => {
                        deleteProduct(productItem._id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                        x-tooltip="tooltip"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                    <Link
                      x-data="{ tooltip: 'Edit' }"
                      to={`/update`}
                      onClick={() => updateProduct(productItem)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                        x-tooltip="tooltip"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewProduct;
