import React, { useState } from "react";
import EntriesContext from "./EntriesContext";
import config from "../../config";

const EntriesState = (props) => {
  const host = config.apiurl;
  const [ledger, setLedger] = useState([]);
  const [payables, setPayables] = useState([]);
  const [receivables, setReceivables] = useState([]);
  const authToken = localStorage.getItem("authToken");

  const getAllLedger = async () => {
    try {
      const response = await fetch(`${host}/entries/ledger`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });
      const data = await response.json();
      setLedger(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllPayables = async () => {
    try {
      const response = await fetch(`${host}/entries/payables`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });
      const data = await response.json();
      setPayables(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllReceivables = async () => {
    try {
      const response = await fetch(`${host}/entries/receivables`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });
      const data = await response.json();
      setReceivables(data);
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <EntriesContext.Provider
      value={{
        ledger,
        payables,
        receivables,
        getAllLedger,
        getAllPayables,
        getAllReceivables,
      }}
    >
      {props.children}
    </EntriesContext.Provider>
  );
};

export default EntriesState;
