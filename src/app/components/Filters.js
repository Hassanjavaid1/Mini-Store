"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { contextApi } from "../Context";
import { RxHamburgerMenu } from "react-icons/rx";

function Filters() {
  const { setData, setIsLoading, selectedOptions, setSelectedOptions } =
    useContext(contextApi);
  const [isVisible, setIsVisible] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const nextParams = new URLSearchParams(searchParams.toString());

  const handleChange = (filterName, value, checked) => {
    setSelectedOptions((prev) => {
      // Multi values filter
      if (Array.isArray(prev[filterName])) {
        const list = prev[filterName];
        return {
          ...prev,
          [filterName]: checked
            ? [...list, value]
            : list.filter((v) => v !== value),
        };
      }

      // Single value filter.
      return { ...prev, [filterName]: value };
    });
  };

  //Apply Filter.

  const handleFilters = async () => {
    try {
      setIsLoading(true);

      // Set Query to URL.

      for (let key in selectedOptions) {
        nextParams.delete(key);
        let value = selectedOptions[key];
        if (Array.isArray(value)) {
          value.forEach((v) => {
            if (v) nextParams.append(key, v);
          });
        } else if (value) {
          nextParams.append(key, value);
        }
      }
      router.replace(`?${nextParams.toString()}`);

      // Fetch Filters Data.

      const url = await fetch("/api/filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedOptions),
      });
      const result = await url.json();
      setData(result);

      // console.log("FINAL RESULT", result);

      //Response Delay.
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setIsLoading(true);
      console.error(err);
    }
  };

  // useEffect(() => {
  //   console.log(selectedOptions);
  // }, [handleChange]);

  // handle visiblity on mobile.

  const handleToggle = () => {
    if (isVisible) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  return (
    <>
      <section className="fixed left-0 sm:sticky sm:top-0 h-[100vh] bg-gray-200 sm:bg-[#38090a2e] py-6 px-2 lg:w-[15%]">
        <RxHamburgerMenu
          className="text-3xl sm:hidden"
          onClick={handleToggle}
        />

        <form onSubmit={(e) => e.preventDefault()} className={`${isVisible?"block":"hidden"} sm:block`}>
          {/* Categoy Filter */}
          <div>
            <h2 className="px-2 font-semibold text-lg my-2">By Categories</h2>
            <ul>
              <li className="flex items-center text-lg">
                <input
                  type="checkbox"
                  value="men-cloths"
                  id="men-cloths"
                  className="w-[2rem] h-[1.3rem] cursor-pointer"
                  onChange={(e) =>
                    handleChange("category", e.target.value, e.target.checked)
                  }
                  checked={selectedOptions.category.includes("men-cloths")}
                />
                <label className="cursor-pointer" htmlFor="men-cloths">
                  Men&lsquo;s Clothing
                </label>
              </li>
              <li className="flex items-center text-lg">
                <input
                  type="checkbox"
                  value="women-cloths"
                  id="women-cloths"
                  className="w-[2rem] h-[1.3rem] cursor-pointer"
                  onChange={(e) =>
                    handleChange("category", e.target.value, e.target.checked)
                  }
                  checked={selectedOptions.category.includes("women-cloths")}
                />
                <label className="cursor-pointer" htmlFor="women-cloths">
                  Women&lsquo;s Clothing
                </label>
              </li>
              <li className="flex items-center text-lg">
                <input
                  type="checkbox"
                  value="jewelery"
                  id="jewelery"
                  className="w-[2rem] h-[1.3rem] cursor-pointer"
                  onChange={(e) =>
                    handleChange("category", e.target.value, e.target.checked)
                  }
                  checked={selectedOptions.category.includes("jewelery")}
                />
                <label className="cursor-pointer" htmlFor="jewelery">
                  Jewelery
                </label>
              </li>
              <li className="flex items-center text-lg">
                <input
                  type="checkbox"
                  value="electronics"
                  id="electronics"
                  className="w-[2rem] h-[1.3rem] cursor-pointer"
                  onChange={(e) =>
                    handleChange("category", e.target.value, e.target.checked)
                  }
                  checked={selectedOptions.category.includes("electronics")}
                />
                <label className="cursor-pointer" htmlFor="electronics">
                  Electronics
                </label>
              </li>
            </ul>
          </div>

          {/* Size Filter */}

          <div>
            <h2 className="px-2 font-semibold text-lg my-2 mt-4">By Size</h2>
            <select
              id="size"
              value={selectedOptions.size || ""}
              className="bg-[#c4bfbf] w-full outline-none border-0 py-3 px-2"
              onChange={(e) => handleChange("size", e.target.value, null)}
            >
              <option value="">Select Size</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="x-large">X Large</option>
            </select>
          </div>

          {/* Price Filter */}

          <div>
            <h2 className="px-2 font-semibold text-lg my-2 mt-4">By Price</h2>
            <ul>
              <li className="flex items-center text-lg font-semibold">
                <input
                  type="checkbox"
                  value="0-50"
                  id="0-50"
                  className="w-[2rem] h-[1.3rem] cursor-pointer"
                  onChange={(e) =>
                    handleChange("price", e.target.value, e.target.checked)
                  }
                  checked={selectedOptions.price.includes("0-50")}
                />
                <label className="cursor-pointer" htmlFor="0-50">
                  $0 - $50
                </label>
              </li>
              <li className="flex items-center text-lg font-semibold">
                <input
                  type="checkbox"
                  value="51-100"
                  id="51-100"
                  className="w-[2rem] h-[1.3rem] cursor-pointer"
                  onChange={(e) =>
                    handleChange("price", e.target.value, e.target.checked)
                  }
                  checked={selectedOptions.price.includes("51-100")}
                />
                <label className="cursor-pointer" htmlFor="51-100">
                  $51 - $100
                </label>
              </li>
              <li className="flex items-center text-lg font-semibold">
                <input
                  type="checkbox"
                  value="101"
                  id="101"
                  className="w-[2rem] h-[1.3rem] cursor-pointer"
                  onChange={(e) =>
                    handleChange("price", e.target.value, e.target.checked)
                  }
                  checked={selectedOptions.price.includes("101")}
                />
                <label className="cursor-pointer" htmlFor="101">
                  $101+
                </label>
              </li>
            </ul>
          </div>

          {/* Filter Button */}
          <button
            onClick={handleFilters}
            className="bg-[#3b82f6] text-white px-8 py-2 cursor-pointer text-lg mt-6"
          >
            Apply
          </button>
        </form>
      </section>
    </>
  );
}

export default Filters;
