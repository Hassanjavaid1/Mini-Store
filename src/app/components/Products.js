"use client";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { contextApi } from "../Context";
import Loader from "./Loader";
import { toast, ToastContainer } from "react-toastify";

function Products() {
  const { data, isLoading, setSaveData, setSaveDataLength } =
    useContext(contextApi);

  //Add to Cart.
  const handleAddToCart = (product) => {
    let newData = JSON.parse(localStorage.getItem("cartData")) || [];

    //Check Duplicate Value
    let isCartExist = newData.filter((item) => item.id == product.id);
    if (isCartExist.length > 0) {
      toast.error("Product already exist in your cart.");
    } else {
      newData.unshift(product);
      localStorage.setItem("cartData", JSON.stringify(newData));
      toast.success("Product added successfully");
    }
    setSaveData(newData);
    setSaveDataLength(newData.length);
  };

  //Checking response
  useEffect(() => {
    console.log("Data", data);
  }, [data]);

  return (
    <>
      <section className="container w-[85%] mx-auto p-4 mt-5 lg:mt-8">
        <h1 className="text-3xl"> Top Products!</h1>
        <div className="flex flex-wrap items-center justify-center gap-6 py-8 mt-2">
          {/* Item Cards */}
          {isLoading ? (
            <Loader />
          ) : data.length == 0 ? (
            <h1 className="text-lg">No Result Found</h1>
          ) : (
            data?.map(({ id, title, price, image, size }, index,arr) => (
              <div
                key={id}
                className="flex-1 min-w-[20rem] flex flex-col items-baseline justify-center overflow-hidden h-full"
              >
                <Image
                  src={image}
                  height={200}
                  width={200}
                  priority
                  className="h-[25rem] w-full object-cover overflow-hidden duration-500 hover:scale-x-110"
                  alt="item"
                />
                <div className="mt-3 text-left">
                  <span className="text-lg">{String(title).slice(0, 45)}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-md font-semibold">${price}</span>
                    <span className="capitalize font-semibold">{size}</span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(arr[index])}
                    className="bg-[#3B82F6] text-white cursor-pointer p-2 py-1 mt-2"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
          <ToastContainer />
        </div>
      </section>
    </>
  );
}

export default Products;
