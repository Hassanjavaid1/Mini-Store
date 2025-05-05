"use client";

import { useRouter, usePathname } from "next/navigation";
import { useContext, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { contextApi } from "../Context";

function Navbar() {
  const { saveDataLength, setIsLoading, setData } = useContext(contextApi);

  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();
  let currentPath = usePathname();

  // Search Fuction.
  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      // Fetch Search Query.
      const queryURL = await fetch(`/api/search?q=${searchQuery}`);
      const result = await queryURL.json();

      //Set Response.
      setData(result);
      
      //Loading Dealy
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setIsLoading(true);
      console.log(err);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between gap-2">
          <h1
            className={`text-3xl font-semibold cursor-pointer ${currentPath == '/cart'?'block':"hidden"} sm:block`}
            onClick={() => router.push("/")}
          >
            Mini Store.
          </h1>
          <form
            onSubmit={(e) => handleSearch(e)}
            className={`${
              currentPath == "/cart" ? "hidden" : "flex"
            } items-center gap-4 sm:gap-2 `}
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-lg bg-gray-200 py-3 px-6 border-0 outline-none w-full"
            />
            <button className="bg-gray-200 text-lg font-semibold outline-none p-3 cursor-pointer hover:bg-[#3b82f6] hover:text-white hidden sm:block">
              Search
            </button>
            <div
              onClick={() => router.push("/cart")}
              className="relative flex items-center justify-center cursor-pointer"
            >
              <FiShoppingCart className="text-4xl" />
              <span className="absolute top-0 right-0 bg-blue-500 rounded-full h-[20px] w-[20px] text-white flex items-center justify-center">
                {saveDataLength}
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Navbar;
