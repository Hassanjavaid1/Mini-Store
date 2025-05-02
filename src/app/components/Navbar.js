"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

//   const router = useRouter();
//   const currentPath = usePathname();
//   const searchParams = useSearchParams();
 
//   const handleSearch = (e) => {
//     e.preventDefault();
//     console.log('Navigated to', currentPath, 'with q=', searchQuery);

//      router.push({
//        pathname:currentPath,
//        query: { ...Object.fromEntries(searchParams), q: searchQuery },

//      });
//     console.log("first");
  //};
  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-3xl font-semibold">Mini Store.</h1>
          <form onSubmit={'handleSearch'} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-lg bg-gray-200 py-3 px-6 border-0 outline-none"
            />
            <button className="bg-gray-200 text-lg font-semibold outline-none p-3 cursor-pointer hover:bg-[#3b82f6] hover:text-white">
              Search
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Navbar;
