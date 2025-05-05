
import Filters from "./components/Filters";
import Products from "./components/Products";

export default function Home() {
  return (
    <>
      <div className="flex items-baseline justify-center">
        <Filters />
        <Products />
      </div>
    </>
  );
}
