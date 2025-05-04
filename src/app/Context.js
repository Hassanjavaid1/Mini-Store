"use client";
import { useSearchParams } from "next/navigation";
import { createContext, useEffect, useState } from "react";

//Create Context.
export const contextApi = createContext();

function Context({ children }) {
  const [data, setData] = useState([]);
  const [toCart, setToCart] = useState([]);
  const [saveData, setSaveData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saveDataLength, setSaveDataLength] = useState(0);
  const [updatedOptions, setUpdatedOptions] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({
    category: [],
    size: "",
    price: [],
  });

  const searchParams = useSearchParams();
  const nextParams = new URLSearchParams(searchParams.toString());

  const fetchData = async () => {
    try {
      const url = await fetch("/api/products");
      const result = await url.json();
      setData(result);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(true);
    }
  };

  const fetchFilter = async () => {
    try {
      // Fetch Filters Data.
      const url = await fetch("/api/filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedOptions),
      });
      const result = await url.json();
      setData(result);
      // console.log("FINAL RESULT", result);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setIsLoading(true);
      console.error(err);
    }
  };

  //Function Call

  useEffect(() => {
    if ([...nextParams].length == 0) {
      //Default Function
      fetchData();
    } else {
      //Filter Function
      if (updatedOptions) {
        fetchFilter();
      }
    }
  }, [updatedOptions]);

  useEffect(() => {
    // Updated filter state.
    const newOptions = { ...selectedOptions };

    for (const [key, value] of searchParams.entries()) {
      if (Array.isArray(newOptions[key])) {
        newOptions[key] = [...newOptions[key], value];
      } else {
        newOptions[key] = value;
      }
    }
    setSelectedOptions(newOptions);
    setUpdatedOptions(newOptions);
  }, []);

  // Checking Cart Items.
  useEffect(() => {
    let newData = JSON.parse(localStorage.getItem("cartData")) || [];
    setSaveData(newData);
    setSaveDataLength(newData.length);
  }, []);

  return (
    <contextApi.Provider
      value={{
        data,
        isLoading,
        toCart,
        selectedOptions,
        saveData,
        saveDataLength,
        setData,
        setIsLoading,
        setToCart,
        setSelectedOptions,
        setSaveData,
        setSaveDataLength,
      }}
    >
      {children}
    </contextApi.Provider>
  );
}

export default Context;
