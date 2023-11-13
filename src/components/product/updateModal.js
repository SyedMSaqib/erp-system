import React, { useContext, useState, useEffect } from 'react';
import ProductContext from '../../context/product/productContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import validator from 'validator';

const UpdateModal = () => {
  let navigate = useNavigate();
  const productContext = useContext(ProductContext);
  const { updateProduct, productId, updateFormValues } = productContext;
  const [product, setProduct] = useState({ ...updateFormValues });
  const [isValidName, setIsValidName] = useState(false);
  const [isValidPrice, setIsValidPrice] = useState(false);
  const [isValidQuantity, setIsValidQuantity] = useState(false);

  const NameValidator = (str) => {
    return /^[A-Za-z\s]+$/.test(str);
  };


  useEffect(() => {
    setProduct(updateFormValues);
  }, [updateFormValues]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onClick = (event) => {
    event.preventDefault();

    if (product.category === '' || product.description === '') {
      return toast.error('Please Enter All Fields');
    }

    if (NameValidator(product.name)) {
      setIsValidName(true);
    } else {
      toast.error('Enter Valid Name');
      setIsValidName(false);
    }

    if (validator.isNumeric(product.quantity)) {
      setIsValidQuantity(true);
    } else {
      toast.error('Enter Valid Quantity');
      setIsValidQuantity(false);
    }

    if (validator.isNumeric(product.price)) {
      setIsValidPrice(true);
    } else {
      toast.error('Enter Valid Price');
      setIsValidPrice(false);
    }
  };

  useEffect(() => {
    if (isValidName && isValidQuantity && isValidPrice) {
      AddProductToDb();
    }
  }, [isValidName, isValidQuantity, isValidPrice]);

  const AddProductToDb = () => {
    updateProduct(
      productId,
      product.name,
      product.description,
      product.category,
      product.quantity,
      product.price
    );
    toast.success(`${product.name} Updated Successfully`);
    navigate('/viewProduct');
  };

  return (
    <div className="lg:mx-auto sm:ml-64 sm:items-end shadow-xl h-1/2 mt-3 mb-5 mx-auto border bg-slate-50 border-gray-300 rounded-xl">
      <div className="pl-8 py-8 px-8 pr-8">
        <div className="">
          <div className="bg-slate-50">
            <h1 className="mb-1 font-bold pr-24 text-3xl flex gap-1 items-baseline font-mono">
              Update Product<span className="text-sm text-gray-400">SAS ERP</span>
            </h1>
            <div className="grid max-w-3xl lg:gap-8 sm:gap-3 py-10 px-8 sm:grid-cols-1 bg-slate-50 rounded-md border-t-4 border-gray-400">
              {/* Name Input */}
              <div className="grid">
                <div className="bg-white flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2">
                  <input
                    name="name"
                    className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                    placeholder="Name"
                    onChange={handleChange}
                    value={product.name}
                  />
                  <label
                    htmlFor="name"
                    className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                  >
                    Name
                  </label>
                </div>
              </div>

              {/* Category Input */}
              <div className="grid">
                <div className="bg-white flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2">
                  <input
                    type="text"
                    name="category"
                    className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                    placeholder="Category"
                    onChange={handleChange}
                    value={product.category}
                  />
                  <label
                    htmlFor="category"
                    className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                  >
                    Category
                  </label>
                </div>
              </div>

              {/* Price Input */}
              <div className="grid">
                <div className="bg-white flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2">
                  <input
                    type="text"
                    name="price"
                    className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                    placeholder="Price"
                    onChange={handleChange}
                    value={product.price}
                  />
                  <label
                    htmlFor="price"
                    className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                  >
                    Price
                  </label>
                </div>
              </div>

              {/* Quantity Input */}
              <div className="grid">
                <div className="bg-white flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2">
                  <input
                    type="text"
                    name="quantity"
                    className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                    placeholder="Quantity"
                    onChange={handleChange}
                    value={product.quantity}
                  />
                  <label
                    htmlFor="quantity"
                    className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                  >
                    Quantity
                  </label>
                </div>
              </div>

              {/* Description Input */}
              <div className="grid">
                <div className="bg-white flex flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2">
                  <input
                    type="text"
                    name="description"
                    className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                    placeholder="Description"
                    onChange={handleChange}
                    value={product.description}
                  />
                  <label
                    htmlFor="description"
                    className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                  >
                    Description
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={onClick}
                type="submit"
                className="mt-4 bg-slate-400 text-white py-2 px-6 rounded-md hover:bg-slate-500"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
