"use client";
import { useContext, useEffect, useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { contextApi } from "../Context";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";

function page() {
  const { saveData, setSaveData, setSaveDataLength } = useContext(contextApi);
  const [totalPrice, setTotalPrice] = useState(0);

  const removeFromCart = (id) => {
    let dataToStore = saveData.filter((item) => item.id !== id);
    localStorage.setItem("cartData", JSON.stringify(dataToStore));
    setSaveData(dataToStore);
    setSaveDataLength(dataToStore.length);
    // updatedTotalPrice(dataToStore);
  };

  const handleQtyChange = (id, newQty) => {
    console.log("ID", id, newQty);
    const updated = saveData.map((item) =>
      item.id === id ? { ...item, qty: newQty > 0 ? newQty : 1 } : item
    );
    setSaveData(updated);
    localStorage.setItem("cartData", JSON.stringify(updated));
  };

  useEffect(() => {
    // Total price of quantity.

    let finalPrice = saveData.reduce((acc, item) => {
      return acc + item.price * item.qty;
    }, 0);
    setTotalPrice(finalPrice);
  }, [saveData]);

  return (
    <>
      <div className="container mx-auto p-16 py-24">
        {saveData.length == 0 || !saveData ? (
          <div className="py-[4rem]">
            <h1 className="text-3xl border-b-2 text-center pb-8">
              No item added yet.
            </h1>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-6">
              {/* Cards */}
              {saveData?.map(
                ({ id, title, image, price, qty, category, size }) => (
                  <div
                    key={id}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-5 w-[50%]">
                      <Image
                        src={image}
                        alt="hello"
                        height={300}
                        width={100}
                        loading="lazy"
                        className="object-center w-auto"
                      />
                      <div>
                        <p className="font-semibold">{title?.slice(0, 50)}</p>
                        <div className="flex items-center justify-center gap-2">
                          <span>price: ${price}</span>
                          <span className="capitalize">size: {size}</span>
                          <span className="capitalize">
                            category: {category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <input
                      type="number"
                      name="qty"
                      value={qty}
                      onChange={(e) => handleQtyChange(id, e.target.value)}
                      className="border-2 p-1 font-semibold text-[1.2rem] text-center"
                    />
                    <FaRegWindowClose
                      onClick={() => removeFromCart(id)}
                      className="text-2xl cursor-pointer transition hover:scale-110"
                    />
                  </div>
                )
              )}
            </div>

            {/* CheckOut */}
            <div className="w-1/2 flex flex-col items-normal gap-5 mt-14">
              <h1 className="text-2xl font-semibold">Items Total.</h1>
              <div className="flex items-center justify-between gap-2">
                <h3>Shipping Fee</h3>
                <span>$10</span>
              </div>
              <div className="flex items-center justify-between gap-2 font-semibold">
                <h3>Overall Total</h3>
                <span className="text-2xl">${Number(totalPrice).toFixed(2)}</span>
              </div>
              <button
                onClick={() => toast.warn("Coming soon.")}
                className="mt-4 bg-blue-500 px-8 py-3 text-2xl text-white transition hover:scale-95 focus:border-0"
              >
                Checkout Now
              </button>
            </div>
            <ToastContainer />
          </>
        )}
      </div>
    </>
  );
}

export default page;
