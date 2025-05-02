import Filters from "./components/Filters";
import Navbar from "./components/Navbar";
import Products from "./components/Products";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex items-baseline justify-center">
        
        <Filters />
        <Products />
      </div>
    </>
  );
}
