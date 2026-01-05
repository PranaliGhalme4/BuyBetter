import { lazy, useState, Suspense, useMemo } from "react";
import products from "../data/products.json";
import ProductList from "../components/ProductList";
import "../home.css";

const FilterCard = lazy(() => import("../components/FilterCard"));

const Home = () => {
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState(200);
  const [rating, setRating] = useState(0);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return (
        product?.name?.toLowerCase().includes(search.toLowerCase()) &&
        (category === "all" ||
          product.category.toLowerCase() === category.toLowerCase()) &&
        product.price <= price &&
        product.rating >= rating
      );
    });
  }, [search, category, price, rating]);


  return (
    <div className="home-page">
      <div className="home-header">
        <div className="product-count">
          <h4>Total Products: {filteredProducts?.length}</h4>
        </div>
        <div className="search-bar-wrapper">
          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <Suspense fallback={<div className="loading-filters">Loading filters...</div>}>
        <div className="home-layout">
          <FilterCard
            selectedCategory={category}
            setSelectedCategory={setCategory}
            price={price}
            setPrice={setPrice}
            rating={rating}
            setRating={setRating}
            totalProducts={filteredProducts?.length}
            open={open}
            setOpen={setOpen}
          />

          {filteredProducts?.length > 0 ? (
            <ProductList products={filteredProducts} />
          ) : (
            <div className="no-data">
              <h2>No products found 😕</h2>
            </div>
          )}
        </div>
      </Suspense>
    </div>
  );
};

export default Home;
