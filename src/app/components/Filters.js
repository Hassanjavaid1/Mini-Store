import React from "react";

function Filters() {
  return (
    <>
      <section className="w-[15%] sticky top-0 h-[100vh] bg-[#38090a2e] py-6 px-2">
        <form>
          {/* Categoy Filter */}
          <div>
            <h2 className="px-2 font-semibold text-lg my-2">By Categories</h2>
            <ul>
              <li className="flex items-center text-lg">
                <input
                  type="checkbox"
                  name="men-cloths"
                  id="men-cloths"
                  className="w-[2rem] h-[1.3rem] cursor-pointer"
                />
                <label className="cursor-pointer" htmlFor="men-cloths">
                  Men's Clothing
                </label>
              </li>
              <li className="flex items-center text-lg">
                <input
                  type="checkbox"
                  name="women-cloths"
                  id="women-cloths"
                  className="w-[2rem] h-[1.3rem] cursor-pointer"
                />
                <label className="cursor-pointer" htmlFor="women-cloths">
                  Women's Clothing
                </label>
              </li>
              <li className="flex items-center text-lg">
                <input
                  type="checkbox"
                  name="jewelry"
                  id="jewelry"
                  className="w-[2rem] h-[1.3rem] cursor-pointer"
                />
                <label className="cursor-pointer" htmlFor="jewelry">
                  Jewelry
                </label>
              </li>
              <li className="flex items-center text-lg">
                <input
                  type="checkbox"
                  name="electronics"
                  id="electronics"
                  className="w-[2rem] h-[1.3rem] cursor-pointer"
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
              name="size"
              id="size"
              className="bg-[#c4bfbf] w-full outline-none border-0 py-3 px-2"
            >
              <option value="" defaultChecked>
                Select Size
              </option>
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
                  name="0-50"
                  id="0-50"
                  className="w-[2rem] h-[1.3rem] cursor-pointer"
                />
                <label className="cursor-pointer" htmlFor="0-50">
                  $0 - $50
                </label>
              </li>
              <li className="flex items-center text-lg font-semibold">
                <input
                  type="checkbox"
                  name="51-100"
                  id="51-100"
                  className="w-[2rem] h-[1.3rem] cursor-pointer"
                />
                <label className="cursor-pointer" htmlFor="51-100">
                  $51 - $100
                </label>
              </li>
              <li className="flex items-center text-lg font-semibold">
                <input
                  type="checkbox"
                  name="101+"
                  id="101+"
                  className="w-[2rem] h-[1.3rem] cursor-pointer"
                />
                <label className="cursor-pointer" htmlFor="101+">
                  $101+
                </label>
              </li>
            </ul>
          </div>

          {/* Filter Button */}
          <button className="bg-[#3b82f6] text-white px-8 py-2 cursor-pointer text-lg mt-6">Apply</button>
        </form>
      </section>
    </>
  );
}

export default Filters;
