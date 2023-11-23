import React, { useState } from 'react';
import VendorContext from './vendorContext';
import config from '../../config';

const VendorState = (props) => {
  const host = config.apiurl;
  const [vendors, setVendors] = useState([]);
  const [vendorId, setVendorId] = useState(null);
  const [updateFormValues, setUpdateFormValues] = useState(null);
  const authToken = localStorage.getItem('authToken');
  const [isVisible, setIsVisible] = useState(false);
  const [vendorModelData, setVendorModelData] = useState({});

  const getAllVendors = async () => {
    try {
      const response = await fetch(`${host}/vendor/fetchAll`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
        },
      });
      const data = await response.json();
      setVendors(data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  const addVendor = async (name, email) => {
    try {
      const newVendor = { name, email };
      setVendors([...vendors, newVendor]);

      const response = await fetch(`${host}/vendor/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
        },
        body: JSON.stringify({ name, email }),
      });
   
    } catch (error) {
      console.error('Error adding vendor:', error);
    }
  };

  const updateVendor = async (id, name, email) => {
    try {
      const response = await fetch(`${host}/vendor/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
        },
        body: JSON.stringify({ name, email }),
      });
     
    } catch (error) {
      console.error('Error updating vendor:', error);
    }
  };

  const deleteVendor = async (id) => {
    try {
      const updatedVendors = vendors.filter((data) => data._id !== id);
      setVendors(updatedVendors);

      const response = await fetch(`${host}/vendor/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'auth-token': authToken,
        },
      });
   
    } catch (error) {
      console.error('Error deleting vendor:', error);
    }
  };

  return (
    <VendorContext.Provider
      value={{
        vendors,
        deleteVendor,
        addVendor,
        updateVendor,
        getAllVendors,
        setVendorId,
        vendorId,
        updateFormValues,
        setUpdateFormValues,
        vendorModelData,
         setVendorModelData,
        isVisible,
        setIsVisible,
      }}
    >
      {props.children}
    </VendorContext.Provider>
  );
};

export default VendorState;
