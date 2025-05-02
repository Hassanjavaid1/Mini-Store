"use client";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { contextApi } from "../Context";
import Loader from "./Loader";

function Products() {
  const { data, isLoading } = useContext(contextApi);
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
          ) : (
            data?.map(({ id, title, price, image }) => (
              <div
                key={id}
                className="flex-1 min-w-[20rem] flex flex-col items-baseline justify-center overflow-hidden h-full cursor-pointer"
              >
                <Image
                  src={image}
                  height={200}
                  width={200}
                  className="h-[25rem] w-full object-cover overflow-hidden duration-500 hover:scale-x-110"
                  alt="item"
                />
                <div className="mt-3 text-left">
                  <div className="text-lg">{String(title).slice(0, 35)}</div>
                  <div className="text-md font-semibold">${price}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}

export default Products;
