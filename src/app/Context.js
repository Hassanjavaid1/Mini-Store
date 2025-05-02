"use client";
import { createContext, useEffect, useState } from "react";

export const contextApi = createContext();

function Context({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const url = await fetch("/api/products");
      const result = await url.json();
      setData(result);
      //  console.log("result", result);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(true);
    }
  };

  //Function Call

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <contextApi.Provider value={{ data, setData, isLoading }}>
      {children}
    </contextApi.Provider>
  );
}

export default Context;
